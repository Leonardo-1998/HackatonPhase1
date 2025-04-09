const formattedRupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  // console.log(formattedRupiah(20000)) // "Rp 20.000,00"

module.exports = {
  formattedRupiah
}