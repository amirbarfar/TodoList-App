'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {RetroGrid} from '@/components/ui/retro-grid'; 
import LoadingPage from '@/components/Loader'; 
import router from 'next/router';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  async function getUser() {
    if (!token) return; 

    setLoading(true);
    try {
      const response = await fetch("https://todo.zmat24.ir/api/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Provider: "OaMTBh1YMNO4kdlz9SCX6UjIIhpIfF",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        router.push('/home');
      } else {
        router.push('/login');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <RetroGrid />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="font-gofteh flex justify-center items-center flex-col mx-auto w-96 py-60">
          <Image src="https://todo.amirbarfar.ir/images/logo.png" className="w-52" width={200} height={200} alt="logo" />
          <p className="text-center w-80">
            لیست کارهایی که قرار تو روز انجام بدی رو بنویس و برنامه ریزی کن تا راحت تر و سریع تر پیش بره کارهات :)
          </p>
          <button onClick={getUser} className="w-80 mt-10 h-10 flex justify-center items-center gap-2 rounded-md">
            <p className="text-black">بریم باهم شروع کنیم</p>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7807 8.25442L4.16086 8.25442L10.1112 2.14416C10.5867 1.65584 10.5867 0.854492 10.1112 0.366172C9.99835 0.250097 9.86436 0.158008 9.71685 0.0951756C9.56935 0.0323432 9.41122 1.64551e-06 9.25153 1.61759e-06C9.09184 1.58967e-06 8.93371 0.032343 8.78621 0.0951754C8.6387 0.158008 8.50471 0.250097 8.39191 0.366171L0.356582 8.61753C0.243547 8.73337 0.153868 8.87096 0.092681 9.02243C0.0314937 9.1739 -1.63241e-06 9.33628 -1.66108e-06 9.50026C-1.68975e-06 9.66425 0.0314936 9.82663 0.0926809 9.9781C0.153868 10.1296 0.243546 10.2672 0.356582 10.383L8.39191 18.6344C8.50479 18.7503 8.63881 18.8422 8.7863 18.905C8.9338 18.9677 9.09188 19 9.25153 19C9.41117 19 9.56926 18.9677 9.71675 18.905C9.86425 18.8422 9.99826 18.7503 10.1111 18.6344C10.224 18.5184 10.3136 18.3808 10.3747 18.2294C10.4358 18.0779 10.4672 17.9156 10.4672 17.7516C10.4672 17.5877 10.4358 17.4254 10.3747 17.2739C10.3136 17.1224 10.224 16.9848 10.1111 16.8689L4.16086 10.7586L17.7807 10.7586C18.4513 10.7586 19 10.1952 19 9.50653C19 8.81787 18.4513 8.25442 17.7807 8.25442Z" fill="black" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
