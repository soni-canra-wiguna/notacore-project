fitler data ketika findmany berdasarkan tanggal

let users = await prisma.user.findMany({
include: {
Postingan: {
where: {
tanggal: {
lt: new Date(new Date(new Date().toISOString().split("T")[0]).setDate(new Date().getDate() + 1)),
gt: new Date(new Date(new Date().toISOString().split("T")[0]).setDate(new Date().getDate() - 1))
}
}
}
}
});

Dalam contoh di atas, query findMany digunakan untuk mendapatkan daftar User dan menyertakan data Postingan yang memiliki tanggal dalam rentang satu hari sebelum dan satu hari setelah tanggal saat ini.

Berikut adalah langkah-langkah yang dilakukan dalam query tersebut:

1. new Date().toISOString().split("T")[0] digunakan untuk mendapatkan tanggal saat ini dalam format ISO tanpa waktu.
2. setDate(new Date().getDate() + 1) dan setDate(new Date().getDate() - 1) digunakan untuk menambahkan dan mengurangi satu hari dari tanggal saat ini.
3. Operator lt (less than) dan gt (greater than) digunakan untuk memfilter data Postingan yang tanggalnya berada dalam rentang yang ditentukan.

Referensi lebih lanjut dapat ditemukan di Prisma Client API reference.
Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan tambahan, jangan ragu untuk bertanya!
