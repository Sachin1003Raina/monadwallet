import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoaderRelative from "../components/common/loader";
import post from "../lib/payment";
import styles from "../styles/Home.module.css";
import { url } from "../store/actions/auth";
import TransactionCard from "../components/common/transactionCard";
import BackdropLayout from "../components/common/backdropLayout";

const recentTransactions = [
  {
    remarks: "Added to Wallet",
    amount: 120,
    isCredited: true,
    timeStamp: "12-06-2022 12:30:05+0530",
    balance: 300,
  },
  {
    remarks: "Paid from Wallet",
    amount: 120,
    isCredited: false,
    timeStamp: "12-05-2022 12:30:05+0530",
    balance: 180,
  },
  {
    remarks: "Added to Wallet",
    amount: 120,
    isCredited: true,
    timeStamp: "12-04-2022 12:30:05+0530",
    balance: 300,
  },
];

export default function Home() {
  const [popup, setPopup] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [wallet, setWallet] = useState(null);
  const username = useSelector((state) => state.auth.user)?.username;
  const [amount, setAmount] = useState(null);
  async function fetUserData() {
    try {
      const response = await axios.get(
        `${url}/wallet`,

        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWallet(response.data);
    } catch (err) {}
  }

  useEffect(() => {
    if (token) {
      fetUserData();
    }
  }, [token]);

  if (!wallet) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <LoaderRelative />
      </div>
    );
  }

  async function paymentHandler() {
    try {
      if (parseInt(amount) > 40) {
        const response = await axios.post(
          `${url}/recharge/wallet`,
          { amount: parseFloat(amount) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        var information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response.data,
        };
        console.log(information);
        post(information);
      } else {
        toast.error(
          "please choose amount greater than 40",
          toast.POSITION.BOTTOM_CENTER
        );
      }
    } catch (err) {
      alert(err);
      toast.error(
        err?.response?.data?.message ?? "Something went Wrong",
        toast.POSITION.BOTTOM_CENTER
      );
    }
  }
  return (
    <div className="px-6 bg-white">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="flex h-screen w-screen justify-center items-center">
        <h1 className="text-2xl" onClick={paymentHandler}>
          Pay Now
        </h1>
      </div> */}
      <header className={styles.header}>
        <a
          href="https://monad.vinciis.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/logo1.png"
            alt="Monad Logo"
            width={150}
            height={40}
          />
        </a>
      </header>
      <hr></hr>
      <main className={styles.main}>
        <div className={styles.dp}>
          <Image
            src="/images/man.png"
            alt="Profile Pic"
            width={80}
            height={80}
          />
        </div>

        <p className="mb-4 text-2xl">{username}</p>

        <div className={styles.credit}>
          <p className={styles.coin}>{wallet.wallet} Coin</p>
        </div>

        <div className={styles.ad}>
          <p>Ad Credit</p>
        </div>

        <button
          onClick={() => {
            setPopup(true);
          }}
          type=" text-xl button text-xl"
          className={styles.recharge}
        >
          ???echarge
        </button>
      </main>
      <hr></hr>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl">Transactions</h3>
        {recentTransactions.map((item) => (
          <TransactionCard key={item.timeStamp} {...item} />
        ))}
      </section>
      <hr></hr>
      <footer className={styles.footer}>
        <a
          className="flex items-center gap-4"
          href="https://www.vinciis.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Powered By</span>

          <Image
            src="/images/circlelogo.png"
            alt="Vinciis Logo"
            className="rounded-full"
            width={42}
            height={42}
          />
        </a>
      </footer>
      {popup && (
        <BackdropLayout
          cancelPopup={() => {
            setPopup(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popupClass bg-white w-96 p-6 h-60 rounded-md"
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              placeholder="Enter an amount"
              className="bg-gray-200 text-gray-700  px-2 py-2 rounded-sm focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => {
                  setPopup(false);
                }}
                className="border-1px cursor-pointer border-gray-400  text-gray-500 p-2 rounded-md text-center  "
              >
                Cancel
              </div>
              <div
                onClick={paymentHandler}
                className="bg-orange-400 cursor-pointer text-white p-2 rounded-md text-center  "
              >
                Recharge Now
              </div>
            </div>
          </div>
        </BackdropLayout>
      )}
    </div>
  );
}
