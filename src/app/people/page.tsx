import React from 'react';
import Link from 'next/link';

export default function People() {
    return (
        <div className="flex justify-center items-start min-h-screen">
            <div className="text-center mt-20 w-11/12 max-w-6xl">
                <h1 className="text-4xl font-bold mb-4">People</h1>
                <p className="text-lg mb-8">
                    Welcome to the peoples page. Here you will find a list of our members.
                </p>

                {/* Grid Layout */}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Person 0 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src="/praneeth.jpeg" 
                            alt="praneeth" 
                            className="w-full h-48 object-contain" 
                        />
                        <div className="p-4">
                            <Link href="https://www.cs.unc.edu/~cpk/" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                Praneeth Chakravarthula
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600">
                            Assistant Professor
                            </p>
                        </div>
                    </div>

                    {/* Person 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src="/XiPeng.jpg" 
                            alt="Xi Peng" 
                            className="w-full h-48 object-contain" 
                        />
                        <div className="p-4">
                            <Link href="mailto:xipeng@cs.unc.edu" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                    Xi Peng
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600">
                                PhD Student
                            </p>
                        </div>
                    </div>

                    {/* Person 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src="/zihao.png" 
                            alt="Zihao Zou" 
                            className="w-full h-48 object-contain" 
                        />
                        <div className="p-4">
                            <Link href="mailto:zihaozou@cs.unc.edu" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                Zihao Zou
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600">
                            PhD Student
                            </p>
                        </div>
                    </div>

                    {/* Person 3 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src="/Hengyu.jpeg" 
                            alt="Hengyu Lian" 
                            className="w-full h-48 object-contain" 
                        />
                        <div className="p-4">
                            <Link href="mailto:Lianhy0@cs.unc.edu" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                Hengyu Lian
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600">
                                PhD Student
                            </p>
                        </div>
                    </div>

                    {/* Add more people below in the same structure */}
                </div>
            </div>
        </div>
    );
}