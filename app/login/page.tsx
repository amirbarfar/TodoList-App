import { RetroGrid } from "@/components/ui/retro-grid";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <RetroGrid />
      <div className="flex flex-col w-96 mx-auto">
        <img src="../images/logo.png" className="w-28 mx-8 my-3" alt="logo" />
        <div className="mx-auto my-20 flex justify-center items-center flex-col font-gofteh h-96">
          <h1 className="text-xl">خوش برگشتی !</h1>
          <form action="" className="grid gap-5 mt-10 border-black w-96 px-8">
            <input className="border-2 h-12 p-3 rounded-lg bg-white" type="text" placeholder="شماره موبایل :" />
            <input className="border-2 h-12 p-3 rounded-lg bg-white" type="password" placeholder="رمز عبور" />
            <button className="bg-black text-white rounded-md h-12">ورود به حساب کاربری</button>
          </form>
          <div className="flex justify-center items-center gap-5 mt-5">
            <p>قبلا ثبت نام نکردی درسته ؟</p>
            <Link href="/register" className="text-slate-950">ثبت نام</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
