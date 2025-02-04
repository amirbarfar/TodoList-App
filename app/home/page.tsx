'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, FormEvent } from "react";
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


  async function logOut() {
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

  const [toggleEventsCat, setToggleEventCat] = useState(false)
  const [toggleNameCat , setToggleNameCat] = useState('')

  function getOptionEdit(event: any) {
    setToggleEventCat(true)
    setToggleNameCat(event.target.value)
  }

  return (
    <div className="w-[390px]">
      <RetroGrid />
      <div className="mx-auto bg-white min-h-screen">
        <div className="flex justify-around p-1 py-5 items-start font-gofteh">
          <div>
            <h1 className="text-lg">خوش اومدی {name} عزیز !</h1>
            <p className="text-xs">خب بریم به برنامه امروزمون برسیم :)</p>
          </div>
          <button onClick={logOut} className="w-32 h-10 bg-red-600 text-sm text-white rounded-lg">خروج از حساب کاربری !</button>
        </div>

        <div className="font-gofteh py-8 px-1">
          <div className="flex justify-start items-start gap-5 flex-col">
            <h2 className="text-xl px-4">دسته‌بندی‌ها</h2>
            <div className="flex justify-between items-center w-full px-4">
              <button onClick={toggleCategoryForm} className="w-32 h-10 bg-blue-500 rounded-md text-white">
                دسته‌بندی جدید
              </button>
              <select onChange={(event) => getOptionEdit(event)} className="flex justify-center items-center gap-10 font-gofteh w-48 border-2 p-1 rounded-md">
                {data.length > 0 ? (
                  data.map((item) => (
                    <option key={item.id} className="flex justify-between items-center" value={item.name}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option className="mx-auto font-gofteh text-xl">دسته‌بندی وجود ندارد</option>
                )}
              </select>
            </div>
          </div>

          {
            toggleEventsCat && (
              <div className="w-80 h-56 mt-2 shadow-xl absolute left-5 flex justify-center items-center flex-col bg-white rounded-md">
                <h2 className="pt-5">خب میخوای اصلاح کنی <span className="text-red-600">{toggleNameCat}</span> یا کلا حذفش کنیم ؟</h2>
                <div className="flex justify-center items-center flex-col gap-5 w-full p-5">
                  <button className="w-full h-12 bg-blue-500 rounded-md text-white">اصلاح کردن</button>
                  <button className="w-full h-12 bg-red-500 rounded-md text-white">حذف کردن</button>
                </div>
              </div>
          )}

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
      </div>
    </div>
  );
}
