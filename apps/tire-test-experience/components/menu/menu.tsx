"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Menu() {
  const { locale } = useParams();

  return (
    <nav className="bg-white shadow-md">
      <ul className="flex justify-center space-x-8 p-4">
        <li>
          <Link
            href={`/${locale}/confidence/educational`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Confidence Educational
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/confidence/game`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Confidence Game
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/efficiency`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Efficiency
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/intro`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Intro
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/longevity`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Longevity
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/menu-map`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Menu Map
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/profiling`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Profiling
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/sport`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Sport
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/winter`}
            className="text-lg font-openSans uppercase text-blue-600 hover:text-blue font-bold hover:underline transition duration-300"
          >
            Winter
          </Link>
        </li>
      </ul>
    </nav>
  );
}
