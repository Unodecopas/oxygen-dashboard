export default function orderState (array: any[], orderBy: string): any[] {
  const newArray = [...array]
  newArray.sort((a, b) => {
    let newOrderBy = orderBy
    if (orderBy.includes('DESC')) {
      const temp = a
      a = b
      b = temp
      newOrderBy = orderBy.split('DESC')[0]
    }
    if (a[newOrderBy] > b[newOrderBy]) {
      return 1
    } else if (a[newOrderBy] < b[newOrderBy]) {
      return -1
    }
    return 0
  })
  return newArray
}
