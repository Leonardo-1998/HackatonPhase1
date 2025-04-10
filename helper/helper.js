const formattedRupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  // console.log(formattedRupiah(20000)) // "Rp 20.000,00"

const currentDate = (date = new Date)=>{
  let currentDate = new Date(date)
  currentDate = currentDate.toISOString().split("T")[0]
  return currentDate
}

module.exports = {
  formattedRupiah,
  currentDate
}