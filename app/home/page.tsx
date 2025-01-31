'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {

  let router = useRouter()

  // check token and login 
  let token = localStorage.getItem("token")
  if (!token) {
    router.push('/login')
  }

  // name user
  let name = localStorage.getItem('user')

  // newCategory
  let [newCategory, setNewCategory] = useState(false)

  let resCategory = () => {
    setNewCategory((prev) => !prev)
  }

  let [nameCategory, setNameCategory] = useState('')

  // logout 

  async function logOut() {
    let response = await fetch("https://todo.zmat24.ir/api/logout", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Provider: "OaMTBh1YMNO4kdlz9SCX6UjIIhpIfF",
        "Authorization": `Bearer ${token}`
      }
    })
    if (response.ok) {
      router.push("/login")
      localStorage.removeItem("token")
    } else {
      console.log("خطایی وجود دارد :(");
    }
  }

  // create category

  async function createCategory(event: any) {
    event.preventDefault()
    let response = await fetch('https://todo.zmat24.ir/api/category/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Provider: "OaMTBh1YMNO4kdlz9SCX6UjIIhpIfF",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ "name": nameCategory })
    })

    if (response.ok) {
      setNewCategory(false)
    } else {
      console.log("دیتا وجود ندارد :(");
    }
  }

  // get category 

  let [data, setData] = useState([])

  async function getCategory() {
    let response = await fetch('https://todo.zmat24.ir/api/category', {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        Accept: "application/json",
        Provider: "OaMTBh1YMNO4kdlz9SCX6UjIIhpIfF",
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      let res = await response.json()
      setData(res.categories)
    } else {
      console.log("خطایی داریم :(");
    }
  }
  useEffect(() => {
    getCategory();
  }, [data]);


  return (
    <div>
      <div className="flex justify-between p-4 items-start font-gofteh">
        <div>
          <h1 className="text-xl">خوش اومدی {name} عزیز !</h1>
          <p className="text-sm">خب بریم به برنامه امروزمون برسیم :)</p>
        </div>
        <button onClick={logOut} className="w-44 h-12 bg-red-600 text-white rounded-lg">خروج از حساب کاربری !</button>
      </div>
      <div className="p-4 font-gofteh">
        <div className="flex justify-start items-start gap-5 flex-col">
          <h2 className="text-2xl">دسته بندی ها</h2>
          <button onClick={resCategory} className="w-44 h-10 bg-blue-500 rounded-md text-white">
            دسته بندی جدید
          </button>
        </div>

        <div className={`transition-all duration-300 ease-in-out ${newCategory ? "opacity-100 scale-100" : "opacity-0 scale-90"} justify-start py-5 items-center absolute flex flex-col w-80 h-60 text-black bg-[#ffffff] mt-10 rounded-lg shadow-2xl`}>
          <h2 className="text-xl mb-8">ساخت دسته بندی جدید :)</h2>
          <form action="" className="flex justify-center items-center flex-col w-full px-5">
            <input onChange={(event) => setNameCategory(event.target.value)} type="text" className="w-full border-2 p-2 border-[#b6b6b6] h-12 rounded-md" required placeholder="چه دسته بندی میخوای ؟" />
            <button onClick={createCategory} className="w-full bg-blue-500 rounded-md text-white h-12 mt-5">بریم که بسازیمش</button>
          </form>
        </div>
      </div>

      <div className="flex justify-start items-center overflow-x-scroll gap-10 p-5 font-gofteh" style={{scrollbarWidth : "thin"}}>
        {
          data.map((item: any) =>
            <div key={item.id} className="flex justify-center items-center flex-col bg-white shadow-lg h-36 min-w-36 rounded-lg">
              {item.name}
            </div>
          )
        }
      </div>
    </div>
  )
} 