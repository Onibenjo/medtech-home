const hasEmptyValue = (obj) => {
  //   let target = true

  return Object.values(obj)
    .map((x) => {
      if (typeof x === "string" && x) return x
      if (!(typeof x === "string")) return x
      return undefined
    })
    .includes(undefined)
  // Object.values({x: false}).every(x => {if(typeof x === "string" && x && x.trim().length) return x})
  //   for (const key in obj) {
  //     if ({}.hasOwnProperty.call(obj, key)) {
  //       const val = obj[key]

  //       if (val && val.trim().length) target = false
  //     }
  //   }
  //   return target
}

export default hasEmptyValue
