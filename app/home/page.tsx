'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { RetroGrid } from "@/components/ui/retro-grid";

export default function Page() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("user");

    if (!storedToken) {
      router.push('/login');
    }

    setToken(storedToken);
    setName(storedName);
  }, [router]);


  const [nameCategory, setNameCategory] = useState("");
  const toggleCategoryForm = () => {
    setNewCategory((prev) => !prev);
  };


  async function logOut (){
    const response = await fetch("https://todo.zmat24.ir/api/logout", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Provider: "OhMnOezSqVgBaJZuALcyHIRLuojhiN",
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      console.error("خطایی وجود دارد :(");
    }
  };

  const [newCategory, setNewCategory] = useState(false);

  async function createCategory(event: React.FormEvent) {
    event.preventDefault();

    if (nameCategory === '' && null) {
      alert('لطفا اول اسم دسته بندی که میخوای رو بنویس!')
    } else {
      const response = await fetch('https://todo.zmat24.ir/api/category/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Provider: "OhMnOezSqVgBaJZuALcyHIRLuojhiN",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: nameCategory })
      });

      console.log(token);
      

      if (response.ok) {
        let data = await response.json();
        console.log(data);
      } else {
        console.error("دیتا وجود ندارد :(");
      }
    }
  };


  interface Category {
    id: number;
    name: string;
  }

  const [data, setData] = useState<Category[]>([]);

  const getCategory = useCallback(async () => {
    if (!token) return;

    const response = await fetch('https://todo.zmat24.ir/api/category', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Provider: "OhMnOezSqVgBaJZuALcyHIRLuojhiN",
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      const res = await response.json();
      if (Array.isArray(res.categories)) {
        setData(res.categories);
      } else {
        console.error("داده نامعتبر است:", res);
      }
    } else {
      console.error("خطایی داریم :(");
    }
  }, [token]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <div>
      <RetroGrid />
      <div className="w-[400px] mx-auto bg-white min-h-screen">
        <div className="flex justify-between p-4 items-start font-gofteh">
          <div>
            <h1 className="text-lg">خوش اومدی {name} عزیز !</h1>
            <p className="text-xs">خب بریم به برنامه امروزمون برسیم :)</p>
          </div>
          <button onClick={logOut} className="w-32 h-10 bg-red-600 text-sm text-white rounded-lg">خروج از حساب کاربری !</button>
        </div>

        <div className="p-4 font-gofteh">
          <div className="flex justify-start items-start gap-5 flex-col">
            <h2 className="text-xl">دسته‌بندی‌ها</h2>
            <button onClick={toggleCategoryForm} className="w-32 h-10 bg-blue-500 rounded-md text-white">
              دسته‌بندی جدید
            </button>
          </div>

          {newCategory && (
            <div className="transition-all duration-300 ease-in-out opacity-100 scale-100 justify-start py-5 items-center absolute flex flex-col w-80 h-60 text-black bg-white mt-10 rounded-lg shadow-2xl">
              <h2 className="text-xl mb-8">ساخت دسته‌بندی جدید :)</h2>
              <form className="flex justify-center items-center flex-col w-full px-5" onSubmit={createCategory}>
                <input
                  type="text"
                  className="w-full border-2 p-2 border-gray-400 h-12 rounded-md"
                  required
                  placeholder="چه دسته‌بندی میخوای ؟"
                  value={nameCategory}
                  onChange={(event) => setNameCategory(event.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 rounded-md text-white h-12 mt-5">بریم که بسازیمش</button>
              </form>
            </div>
          )}
        </div>

        <div className="flex justify-start items-center overflow-x-scroll gap-10 p-5 font-gofteh" style={{ scrollbarWidth: "thin" }}>
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className="flex justify-center items-center flex-col bg-white shadow-lg h-32 min-w-32 rounded-lg">
                {item.name}
              </div>
            ))
          ) : (
            <p className="mx-auto font-gofteh text-xl">دسته‌بندی وجود ندارد</p>
          )}
        </div>
      </div>
    </div>
  );
}
