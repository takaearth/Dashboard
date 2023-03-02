import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//context
import { useAuth } from "@/context/authContext";
//custom
import { classNames } from "@/helpers";
//dynamic
const FaEye = dynamic(async () => (await import("react-icons/fa")).FaEye);
const FaEyeSlash = dynamic(
  async () => (await import("react-icons/fa")).FaEyeSlash
);

export default function SignInPage() {
  const { status, error, user, SignIn } = useAuth();

  useEffect(() => {
    if (user) Router.push("/");
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dataObject, setDataObject] = useState({});
  const [inputStates, setinputStates] = useState({});

  return (
    <>
      <Head>
        <title>Taka Dashboard | Signin</title>
        <meta name="description" content="Taka Earth Intranet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen w-full bg-emerald-50">
        <section className="grid lg:grid-cols-2">
          <div className="relative bg-gradient-to-t from-emerald-600 to-emerald-700 h-screen w-full overflow-hidden hidden lg:block">
            <div className="absolute left-[-40vw] top-[20vh]">
              <div className="relative h-[80vw] w-[80vw] mb-5">
              <Image
                src="/images/taka-bin.svg"
                sizes="(max-width: 150px) 100vw"
                alt="Taka Earth"
                priority
                fill
              />
              </div>
            </div>
          </div>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="relative h-[9vh] w-[18vh] mb-5">
                <Image
                  src="/images/logo-color.png"
                  sizes="(max-width: 150px) 100vw"
                  alt="Taka Earth"
                  priority
                  fill
                />
              </div>
              <div className="w-full bg-white rounded-lg drop-shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6 caret-emerald-600"
                    onSubmit={handleSubmit}
                  >
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="email"
                        placeholder=" "
                        onChange={(e) => change(e, "mail")}
                        className={classNames(
                          "block rounded-lg px-2.5 pb-1.5 pt-6 w-full text-sm bg-white border focus:border-2 appearance-none focus:outline-none focus:ring-0 peer",
                          inputStates?.email === "success" &&
                            "text-success border-success",
                          inputStates?.email?.error &&
                            "text-error border-error",
                          inputStates?.email !== "success" &&
                            !inputStates?.email?.error &&
                            "border-emerald-500 focus:border-emerald-500"
                        )}
                      />
                      <label
                        className={classNames(
                          "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
                          inputStates?.email === "success" && "text-success",
                          inputStates?.email?.error && "text-error",
                          inputStates?.email !== "success" &&
                            !inputStates?.email?.error &&
                            "text-emerald-700 peer-focus:text-emerald-600"
                        )}
                      >
                        Email
                      </label>
                      {inputStates?.email?.error && (
                        <p className="text-error text-xs italic text-center mt-1">
                          {inputStates?.email?.mess}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="relative w-full">
                        <input
                          placeholder=" "
                          name="password"
                          onChange={change}
                          type={visible ? "text" : "password"}
                          className={classNames(
                            "block rounded-lg px-2.5 pb-1.5 pt-6 w-full text-sm bg-white border focus:border-2 appearance-none focus:outline-none focus:ring-0 peer",
                            inputStates?.password === "success" &&
                              "text-success border-success",
                            inputStates?.password?.error &&
                              "text-error border-error",
                            inputStates?.password !== "success" &&
                              !inputStates?.password !== "error" &&
                              "border-emerald-500 focus:border-emerald-500"
                          )}
                        />
                        <label
                          className={classNames(
                            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
                            inputStates?.password === "success" &&
                              "text-green-500",
                            inputStates?.password?.error && "text-error",
                            inputStates?.password !== "success" &&
                              !inputStates?.password !== "error" &&
                              "text-emerald-700 peer-focus:text-emerald-600"
                          )}
                        >
                          Password
                        </label>
                      </div>
                      <button
                        onClick={toggleVisibility}
                        className={classNames(
                          "btn btn-circle btn-outline btn-primary",
                          !visible && "!text-gray-300"
                        )}
                      >
                        <label
                          className={classNames(
                            "swap swap-rotate text-6xl",
                            visible && "swap-active"
                          )}
                        >
                          <FaEye className="swap-on" size="1.25rem" />
                          <FaEyeSlash className="swap-off" size="1.25rem" />
                        </label>
                      </button>
                    </div>
                    {inputStates?.password?.error && (
                      <p className="text-error text-xs italic text-center mt-1">
                        {inputStates?.password?.mess}
                      </p>
                    )}
                    <div className="grid place-content-center">
                      <button
                        type="submit"
                        className={classNames(
                          "btn btn-lg btn-wide btn-primary rounded-xl",
                          loading && "loading"
                        )}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (isValidated()) {
      let res = await SignIn(dataObject);
      if (res) setLoading(false);
    } else {
      setLoading(false);
    }
  }

  function isValidated() {
    if (
      inputStates?.email === "success" &&
      inputStates?.password === "success"
    ) {
      return true;
    } else {
      if (inputStates?.email !== "success") {
        setinputStates((prevState) => {
          return {
            ...prevState,
            email: {
              error: true,
              mess: "Please enter a valid input",
            },
          };
        });
      }
      if (inputStates?.password !== "success") {
        setinputStates((prevState) => {
          return {
            ...prevState,
            password: {
              error: true,
              mess: "Please enter a valid input",
            },
          };
        });
      }
      return false;
    }
  }

  function toggleVisibility(event) {
    event.preventDefault();
    setVisible((prevState) => {
      return !prevState;
    });
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function change(event, type = "str") {
    switch (type) {
      case "mail":
        setDataObject((prevState) => {
          return {
            ...prevState,
            [event.target.name]: event.target.value,
          };
        });

        if (validateEmail(event.target.value)) {
          setinputStates((prevState) => {
            return {
              ...prevState,
              [event.target.name]: "success",
            };
          });
        } else {
          setinputStates((prevState) => {
            return {
              ...prevState,
              [event.target.name]: null,
            };
          });
        }
        break;
      case "str":
        setDataObject((prevState) => {
          return {
            ...prevState,
            [event.target.name]: event.target.value,
          };
        });

        if (event.target.value?.length > 5) {
          setinputStates((prevState) => {
            return {
              ...prevState,
              [event.target.name]: "success",
            };
          });
        } else {
          setinputStates((prevState) => {
            return {
              ...prevState,
              [event.target.name]: null,
            };
          });
        }
        break;
      default:
        break;
    }
  }
}
