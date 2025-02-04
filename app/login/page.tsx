"use client";

import { RetroGrid } from "@/components/ui/retro-grid";
import Link from "next/link";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

interface DataType {
  email: string,
  password: string
}

function Page() {

  const router = useRouter();

  async function addUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: DataType = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    }

    try {
      const response = await fetch("https://todo.zmat24.ir/api/login", {
        method: "POST",
        headers: {
          Provider: "nXNFCnarjFY1X3SJy7dxN1UuPDYyIA",
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.token) {
          localStorage.setItem("token", data.token)
          router.push('/home');
        }else{
          alert("لطفا ابتدا ثبت نام کنید :)")
        }
      } else {
        alert("رمز عبور شما یا ایمیل مطابقت ندارد !")
      }
    } catch (error) {
      console.log(error);
      
      alert('مشکلی در ثبت نام پیش آمده. لطفا دوباره تلاش کنید.');
    }
  }

  return (
    <div>
      <RetroGrid />
      <div className="flex flex-col w-96 mx-auto">
        <div className="mx-auto my-44 flex justify-center items-center flex-col font-gofteh h-96">
          <h1 className="text-xl">خوش برگشتی !</h1>
          <form onSubmit={addUser} className="grid gap-5 mt-10 border-black w-96 px-8">
            <input name="email" className="border-2 h-12 p-3 rounded-lg bg-white" type="text" placeholder="ایمیل : " />
            <input name="password" className="border-2 h-12 p-3 rounded-lg bg-white" type="password" placeholder="رمز عبور" />
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

export default Page;