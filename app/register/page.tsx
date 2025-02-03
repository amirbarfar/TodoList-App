"use client";

import { RetroGrid } from "@/components/ui/retro-grid";
import Link from "next/link";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

interface DataType {
    name: string;
    email: string;
    password: string;
}

function Page() {
    const router = useRouter();

    async function addUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data: DataType = {
            name: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        try {
            const response = await fetch('https://todo.zmat24.ir/api/register', {
                method: 'POST',
                headers: {
                    Provider: "OaMTBh1YMNO4kdlz9SCX6UjIIhpIfF",
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user" , data.user.name);
                router.push('/home');
            } else {
                alert('شما قبلا با این ایمیل ثبت نام کرده اید.');
                
            }
        } catch (error) {
            console.error('خطا:', error);
        }
    }

    return (
        <div>
            <div>
                <RetroGrid />
                <div className="flex flex-col w-96 mx-auto">
                    <div className="mx-auto my-44 flex justify-center items-center flex-col font-gofteh h-96">
                        <h1 className="text-xl">بیا ثبت نام کنیم !</h1>
                        <form onSubmit={addUser} className="grid gap-5 mt-10 border-black w-96 px-8">
                            <input name="username" className="border-2 h-12 p-3 rounded-lg bg-white" type="text" placeholder="نام و نام خانوادگی :" required />
                            <input name="email" className="border-2 h-12 p-3 rounded-lg bg-white" type="email" placeholder="ایمیل : " required />
                            <input name="password" className="border-2 h-12 p-3 rounded-lg bg-white" type="password" placeholder="رمز عبور" required />
                            <button type="submit" className="bg-black text-white rounded-md h-12">بزن بریم واسه ثبت نام :)</button>
                        </form>
                        <div className="flex justify-center items-center gap-5 mt-5">
                            <p>خب به نظر میاد قبلا ثبت نام کردی !</p>
                            <Link href="/login" className="text-slate-950">ورود</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;