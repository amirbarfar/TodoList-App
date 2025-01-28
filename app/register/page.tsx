import { RetroGrid } from "@/components/ui/retro-grid";
import Link from "next/link";

export default function page() {
    return (
        <div>
            <div>
                <RetroGrid />
                <div className="flex flex-col w-96 mx-auto">
                    <img src="../images/logo.png" className="w-28 mx-8 my-3" alt="logo" />
                    <div className="mx-auto my-20 flex justify-center items-center flex-col font-gofteh h-96">
                        <h1 className="text-xl">بیا ثبت نام کنیم !</h1>
                        <form action="" className="grid gap-5 mt-10 border-black w-96 px-8">
                            <input className="border-2 h-12 p-3 rounded-lg bg-white" type="text" placeholder="نام و نام خانوادگی :" />
                            <input className="border-2 h-12 p-3 rounded-lg bg-white" type="text" placeholder="شماره موبایل :" />
                            <input className="border-2 h-12 p-3 rounded-lg bg-white" type="password" placeholder="رمز عبور" />
                            <button className="bg-black text-white rounded-md h-12">بزن بریم واسه ثبت نام :)</button>
                        </form>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <p>خب به نظر میاد قبلا ثبت نام کردی !</p>
                            <Link href="/login" className="text-slate-950">ورود</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
