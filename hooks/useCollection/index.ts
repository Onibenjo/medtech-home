/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import firebase from "utils/auth/initFirebase"
import "firebase/firestore"

const db = firebase.firestore()

type Document<T = {}> = T & { id: string }
type Ref<> = {
  limit?: number
  orderBy?: any
  where?: any

  startAt?: number
  endAt?: number
  startAfter?: number
  endBefore?: number

  // THESE ARE NOT JSON SERIALIZABLE
  // startAt?: number | DocumentSnapshot
  // endAt?: number | DocumentSnapshot
  // startAfter?: number | DocumentSnapshot
  // endBefore?: number | DocumentSnapshot
}

type ListenerReturnType<Doc extends Document = Document> = {
  initialData: Doc[] | null
  unsubscribe: ReturnType<
    // ReturnType<typeof firebase.app.App["firestore"]["doc"]>["onSnapshot"]
    ReturnType<ReturnType<firebase.app.App["firestore"]>["doc"]>["onSnapshot"]
  >
}
type WhereItem<Doc extends object = {}, Key = keyof Doc> = [
  Key | firebase.firestore.FieldPath,
  firebase.firestore.WhereFilterOp,
  unknown
]
type WhereArray<Doc extends object = {}> = WhereItem<Doc>[]
type WhereType<Doc extends object = {}> = WhereItem<Doc> | WhereArray<Doc>

const createRef = <Doc extends object = {}>(
  path: string,
  { where, orderBy, limit, startAt, endAt, startAfter, endBefore }: Ref
) => {
  let ref: firebase.firestore.Query = db.collection(path)

  function multipleConditions(w: WhereType<Doc>): w is WhereArray<Doc> {
    return !!w && Array.isArray(w[0])
  }
  function multipleOrderBy(o) {
    return Array.isArray(o[0])
  }
  if (where) {
    if (multipleConditions(where)) {
      where.forEach((w) => {
        ref = ref.where(w[0] as string, w[1], w[2])
      })
    } else if (typeof where[0] === "string" && typeof where[1] === "string") {
      ref = ref.where(
        where[0],
        where[1] as firebase.firestore.WhereFilterOp,
        where[2]
      )
    }
  }
  if (orderBy) {
    if (typeof orderBy === "string") {
      ref = ref.orderBy(orderBy)
    } else if (Array.isArray(orderBy)) {
      if (multipleOrderBy(orderBy)) {
        orderBy.forEach(([order, direction]) => {
          ref = ref.orderBy(order as string, direction)
        })
      } else {
        const [order, direction] = orderBy
        ref = ref.orderBy(order as string, direction)
      }
    }
  }
  if (startAt) {
    ref = ref.startAt(startAt)
  }
  if (endAt) {
    ref = ref.endAt(endAt)
  }
  if (startAfter) {
    ref = ref.startAfter(startAfter)
  }
  if (endBefore) {
    ref = ref.endBefore(endBefore)
  }
  if (limit) {
    ref = ref.limit(limit)
  }
  return ref
}

const createListenerAsync = async <Doc extends Document = Document>(
  path: string,
  queryString: string,
  callback: Function
): Promise<ListenerReturnType<Doc>> => {
  return new Promise((resolve, reject) => {
    const query: Ref = JSON.parse(queryString) ?? {}
    const ref = createRef(path, query)
    const unsubscribe = ref.onSnapshot(
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const data: Doc[] = []
        querySnapshot.forEach((doc) => {
          const docData =
            doc.data({
              serverTimestamps: "estimate",
            }) ?? {}
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
          data.push(docToAdd)
        })
        if (callback) callback(data)
        resolve({
          initialData: data,
          unsubscribe,
        })
      },
      (err) => {
        console.log(err)
        reject()
      }
    )
  })
}

const useCollectionSnap = (collection: string) => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = db.collection(collection).onSnapshot(
      (snapshot) => {
        if (snapshot.size) {
          const collectionData = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setData(collectionData)
        } else {
          setData([])
        }
      },
      () => setError(true)
    )
    setLoading(false)
    return () => unsubscribe()
  }, [collection])

  return [data, loading, error]
}

const useTransactionSnap = (collection: string, limit: number) => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = db
      .collection(collection)
      .limit(limit)
      .orderBy("time", "desc")
      .onSnapshot(
        (snapshot) => {
          if (snapshot.size) {
            const collectionData = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              }
            })
            setData(collectionData)
          } else {
            setData([])
          }
        },
        () => setError(true)
      )
    setLoading(false)
    return () => unsubscribe()
  }, [collection, limit])

  return [data, loading, error]
}

const useCollection = (
  collection: string | null,
  query: Ref & {
    listen?: boolean
    skip?: boolean
  } = {}
) => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refetchIndex, setRefetchIndex] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const unsubscribeRef = useRef<ListenerReturnType["unsubscribe"] | null>(null)
  const {
    where,
    endAt,
    endBefore,
    startAfter,
    startAt,
    orderBy,
    limit,
    listen = false,
    skip = false,
  } = query

  const memoQueryString = useMemo(
    () =>
      JSON.stringify({
        where,
        endAt,
        endBefore,
        startAfter,
        startAt,
        orderBy,
        limit,
      }),
    [endAt, endBefore, limit, orderBy, startAfter, startAt, where]
  )

  const refetch = () => setRefetchIndex((prev) => prev + 1)

  // const shouldListen = useRef(listen)
  // useEffect(() => {
  //   shouldListen.current = listen
  // })

  const add = useCallback(
    (dataToAdd) => {
      if (!collection) return
      if (!dataToAdd) return

      // db.collection(collection).add(dataToAdd)

      const dataArray = Array.isArray(dataToAdd) ? dataToAdd : [dataToAdd]

      const ref = db.collection(collection)

      const docsToAdd = dataArray.map((doc) => ({
        ...doc,
        // generate IDs we can use that in the local cache that match the server
        id: ref.doc().id,
      })) // solve this annoying TS bug 😅

      // add to network
      const batch = db.batch()

      docsToAdd.forEach(({ id, ...doc }) => {
        // take the ID out of the document
        batch.set(ref.doc(id), doc)
      })

      batch.commit()
      return docsToAdd.map(({ id }) => id)
    },
    [collection]
  )

  const paginate = async () => {
    if (!data?.length) return
    if (!limit) return
    if (!collection) return

    const ref = db.collection(collection)

    // get the last document in our current query
    // ideally we could pass just a doc ID, but firestore requires the doc snapshot
    const startAfterDocument = await ref.doc(data[data.length - 1].id).get()

    // get more documents, after the most recent one we have
    const moreDocs = await ref
      .orderBy(orderBy)
      .startAfter(startAfterDocument)
      .limit(limit)
      .get()
      .then((d) => {
        // const docs = []
        const docs: any[] = d.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        // d.docs.forEach((doc) => docs.push({ ...doc.data(), id: doc.id as any }))
        return docs
      })

    setData((state) => [...state, ...moreDocs])
  }

  const set = useCallback(
    (dataToAdd, id, setOptions) => {
      if (!collection) return
      if (!dataToAdd) return

      if (id) {
        db.collection(collection).doc(id).set(dataToAdd, setOptions)
        return
      }
      db.collection(collection).doc().set(dataToAdd, setOptions)
    },
    [collection]
  )
  const del = useCallback(
    (doc) => {
      if (!collection) return
      if (!doc) return
      db.collection(collection).doc(doc).delete()
    },
    [collection]
  )

  useEffect(() => {
    return () => {
      // clean up listener on unmount if it exists
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
    }
    // should depend on the path, queyr, and listen being the same...
  }, [])

  useEffect(() => {
    if (!collection) return
    if (skip) return
    // if (shouldListen.current) {
    if (listen) {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
      createListenerAsync(collection, memoQueryString, setData)
        .then(({ unsubscribe }) => {
          unsubscribeRef.current = unsubscribe
          // setData(initialData)
          setLoading(false)
        })
        .catch(() => setError(true))
      setLoading(false)
      return
    }
    const queryObj: Ref = JSON.parse(memoQueryString) ?? {}
    const ref = createRef(collection, queryObj)
    // db.collection(collection)
    const fetchData = () => {
      setLoading(true)
      ref
        .get()
        .then((snapshot) => {
          const collectionData = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setData(collectionData)
        })
        .catch(() => setError(true))
      setLoading(false)
    }
    fetchData()
  }, [collection, listen, memoQueryString, refetchIndex, skip])

  return { data, loading, error, refetch, add, set, del, paginate }
}

export { useCollection, useCollectionSnap, useTransactionSnap }

// export const useAuth = () => {
//     const [state, setState] = React.useState(() => { const user = firebase.auth().currentUser return { initializing: !user, user, } })
//     function onChange(user) {
//       setState({ initializing: false, user })
//     }

//     React.useEffect(() => {
//       // listen for auth state changes
//       const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
//       // unsubscribe to the listener when unmounting
//       return () => unsubscribe()
//     }, [])

//     return state
//   }
