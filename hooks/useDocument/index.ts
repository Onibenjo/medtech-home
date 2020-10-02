/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, useCallback } from "react"
import firebase from "utils/auth/initFirebase"
import "firebase/firestore"

const db = firebase.firestore()

type Document<T = {}> = T & {
  id: string
  exists?: boolean
  hasPendingWrites?: boolean
}

type Options = {
  listen?: boolean
  skip?: boolean
}

type ListenerReturnType<Doc extends Document = Document> = {
  initialData: Doc
  unsubscribe: ReturnType<
    ReturnType<ReturnType<firebase.app.App["firestore"]>["doc"]>["onSnapshot"]
  >
}

const useDocumentSnap = (doc: string) => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let unsubscribe
    if (doc) {
      unsubscribe = db.doc(doc).onSnapshot(
        (snap) => {
          setData(snap.data())
        },
        () => setError(true)
      )
      setLoading(false)
    }
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [doc])

  return [data, loading, error]
}

const createListenerAsync = async <Doc extends Document = Document>(
  path: string,
  callback?: Function
): Promise<ListenerReturnType<Doc>> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = db.doc(path).onSnapshot(
      (doc) => {
        const docData = doc.data() ?? {}
        const docToAdd = {
          ...docData,
          id: doc.id,
          exists: doc.exists,
          hasPendingWrites: doc.metadata.hasPendingWrites,
        } as any
        if (
          process.env.NODE_ENV === "development" &&
          (docData.exists || docData.id || docData.hasPendingWrites)
        ) {
          // eslint-disable-next-line no-console
          console.warn(
            "[use-collection] warning: Your document, ",
            doc.id,
            " is using one of the following reserved fields: [exists, id, hasPendingWrites]. These fields are reserved. Please remove them from your documents."
          )
        }
        if (callback) callback(docToAdd)
        resolve({
          initialData: docToAdd,
          unsubscribe,
        })
      },
      () => reject()
    )
  })
}
const useDocument = <
  Data extends object = {},
  Doc extends Document = Document<Data>
>(
  doc: string,
  options: Options = {}
) => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [refetchIndex, setRefetchIndex] = useState<number>(0)
  const unsubscribeRef = useRef<ListenerReturnType["unsubscribe"] | null>(null)
  const { listen = false, skip = false } = options

  const refetch = () => setRefetchIndex((prev) => prev + 1)

  const del = useCallback(
    (dataToAdd) => {
      if (!doc) return
      if (!dataToAdd) return

      db.doc(doc).delete()
    },
    [doc]
  )
  const deleteField = useCallback(
    (field) => {
      if (!doc) return
      if (!field) return

      db.doc(doc).update({
        [field]: firebase.firestore.FieldValue.delete(),
      })
    },
    [doc]
  )
  const set = useCallback(
    (dataToAdd, setOptions) => {
      if (!doc) return
      if (!dataToAdd) return

      db.doc(doc).set(dataToAdd, setOptions)
    },
    [doc]
  )
  const update = useCallback(
    (dataToAdd) => {
      if (!doc) return
      if (!dataToAdd) return

      db.doc(doc).update(dataToAdd)
    },
    [doc]
  )

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
    }
  }, [doc, listen])

  useEffect(() => {
    if (!doc) return
    if (skip) return
    if (listen) {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
      createListenerAsync<Doc>(doc, setData).then(({ unsubscribe }) => {
        unsubscribeRef.current = unsubscribe
        // setData(initialData)
        setLoading(false)
      })
      return
    }

    db.doc(doc)
      .get()
      .then((docData) => {
        // if (!docData.exists) {
        //   throw Error("Document does not exist!")
        // }
        setData({ id: docData.id, exists: docData.exists, ...docData.data() })
      })
      .catch(() => setError(true))
    setLoading(false)
    // return () => unsubscribe()
  }, [doc, listen, refetchIndex, skip])

  return { data, loading, error, refetch, del, set, deleteField, update }
}

export { useDocument, useDocumentSnap }
