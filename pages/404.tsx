import React from "react";
import Link from "next/link";

export default function Custom404 () {

  return (
    <div>
      <img
        className="colorbox-304"
        src="https://howtoweb.ru/wp-content/uploads/2019/01/1546615769404-error-template-9.png"
        alt=""
      />
      <section>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </section>
      <style jsx>{`
      div {
        max-width: 36rem;
        padding: 0 1rem;
        margin: 3rem auto 6rem;
      }
      section {
        margin-top: 3rem;
        text-align: center;
      }
    `}
      </style>
    </div>
  );
};
