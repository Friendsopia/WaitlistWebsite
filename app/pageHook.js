"use client";


import { PiWarningThin } from "react-icons/pi";
import { TbArrowsJoin2 } from "react-icons/tb";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

import Snowfall from "react-snowfall";

// useForm
import { useForm, Controller } from "react-hook-form";


function PageHook() {

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move

  const {
    // register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm();


  const validateEmail = (mail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(mail);
  };

  const handleOpenModel = () => {
    setIsOpenModel(true);
    setTimeout(() => {
      setIsOpenModel(false);
    }, 4000);
  };

  const onSubmit = async (data) => {
    try {
      let res = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data.email),
      });
      console.log(res,"hello")
      if (res.ok) {
        reset();
        handleOpenModel();
      } else if (res.status === 409) {
        reset();
        throw new Error({ message: "Email Already Exists" });
        // Handle email conflict error
        // For example, set an error state to display a message to the user
      } else {
        reset();
        throw new Error({ message: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      // Handle other errors, e.g., network errors
    }
  };


  // const onSubmit = async (data) => {
  //   try {
  //     let res = await fetch("https://main.d29cj0x31gnm03.amplifyapp.com/api/email", {
  //       method: "POST",
  //       body: JSON.stringify(data.email),
  //     });
  //     if (res.ok) {
  //       reset();
  //       handleOpenModel();
  //     }

  //     if (!res.ok) {
  //       reset();
  //       throw new Error({ message: "Email already exists" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="h-full w-full p-3 flex items-center justify-center relative z-50">
      <Snowfall
        snowflakeCount={200}
        color="grey"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: -9,
        }}
        speed={"140"}
        radius={"12"}
      />
      <section className=" mt-5  ">
        <div className="space-y-4 ">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              {/* You can use video here as well */}
              {/* <Image
                width={128}
                height={128}
                alt="shake head"
                src={"/img/shake.gif"}
                className="w-32"
              /> */}
            </div>
            <div className="flex items-center justify-center">
              <div className="p-[1px] bg-transparent  relative">
                <div className="p-2 ">
                  <span className="absolute inset-0 px-3 rounded-3xl overflow-hidden">
                    <motion.span
                      className="w-[500%] aspect-square absolute bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-20"
                      initial={{
                        rotate: -90,
                      }}
                      animate={{
                        rotate: 90,
                      }}
                      transition={{
                        duration: 3.8,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{
                        translateX: "-50%",
                        translateY: "-10%",
                        zIndex: -1,
                      }}
                    />
                  </span>

                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold  sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent dark:bg-gradient-to-r bg-gradient-to-tr dark:from-white from-black to-neutral-600 dark:to-neutral-800 capitalize md:max-w-2xl lg:max-w-3xl mx-auto ">
              Groove: Discover Connect Groove!
            </h1>
            <p style={{marginTop: '30px', marginBottom: "30px"}} className="max-w-[600px] leading-7 text-center text-[16px] bg-clip-text text-transparent dark:bg-gradient-to-br bg-gradient-to-tr dark:from-white from-black to-neutral-600 dark:to-neutral-700 mx-auto ">
              "Welcome to Groove: Where Connections Spark and Vibes Soar!
              Get ready to groove with us! Discover new friends, exciting events, and unforgettable moments. Let's turn up the fun together!"
            </p>
            {errors.email && (
              <p className="border dark:border-white/25 border-[#704705] flex gap-x-3 items-center p-2 pl-5 max-w-md bg-gradient-to-r from-10% dark:from-[#704705] text-[#3a2503] from-[#f5a524] via-30% dark:via-black dark:to-black to-100% to-[#704705] mx-auto rounded-md dark:text-white ">
                <PiWarningThin className="text-[#704705] dark:text-white text-lg" />
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full   space-y-2 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col lg:flex-row mx-auto lg:space-x-2 max-w-lg"
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className={` flex-1 py-2.5  outline-none focus:border-2 focus:border-neutral-100 dark:border bg-opacity-20 shadow-md border 
                    
                    border-neutral-400   dark:text-white dark:border-white/20 placeholder:text-neutral-500  pl-5 rounded-lg focus-within:border-none ${isDirty && !isValid
                        ? "bg-[#f5a524] "
                        : isDirty && isValid
                          ? "bg-green-500"
                          : ""
                      }`}
                  />
                )}
                rules={{
                  required: "Email is required!",
                  validate: (value) =>
                    validateEmail(value) || " Invalid email format",
                }}
              />

              <button
                disabled={isSubmitting}
                className="flex items-center justify-center gap-x-3 bg-gradient-to-tr from-black from-50% via-black/40 to-gray-600/40 via-45% border-t-gray-700  disabled:cursor-not-allowed lg:w-36 shadow-md  border border-b-0 border-r-0 border-l-0 bg-black  mt-4 lg:mt-0 rounded-md px-2 py-2.5 w-full  font-InterMedium text-sm text-gray-200 dark:text-gray-500 "
                type="submit"
              >
                <TbArrowsJoin2 className="text-[#383127]" />
                {isSubmitting ? (
                  "loading "
                ) : (
                  <span className="shrink-0">Join Waitlist</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageHook;