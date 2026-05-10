# PaeniaWeb

เว็บไซต์แนะนำและหน้าดาวน์โหลดสำหรับ [Paenia](https://github.com/PattanasakGit/Paenia) — Next.js (App Router)

## พัฒนาในเครื่อง

```sh
npm install
npm run dev
```

## ดาวน์โหลด

URL ของไฟล์ `.dmg` ตั้งค่าใน `lib/download.ts` (หรือ `NEXT_PUBLIC_PAENIA_DMG_URL` ใน `.env`) ให้ตรงกับ GitHub Release ที่แนบไฟล์ติดตั้ง

แอปบนเดสก์ท็อปตรวจเวอร์ชันใหม่ผ่าน GitHub Releases API (`UpdateCheck` ใน repo Paenia); เว็บนี้เป็นช่องทางดาวน์โหลดและข้อมูลผลิตภัณฑ์เท่านั้น
