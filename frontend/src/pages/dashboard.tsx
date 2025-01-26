/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IAUTH } from "./_app";
import Error from "next/error";

const DashboardPage = ({ auth }: { auth: IAUTH }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.username) {
      router.push("/login");
    } else {
      setUser(user);
    }
  }, [router]);

  const fetchReservations = async () => {
    if (!startDate || !endDate) return;

    const response = await fetch(
      `http://localhost:8000/reservations?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    setReservations(data);
  };

  if (!auth.login) {
    return <Error statusCode={403} />;
  }

  return (
    <div className="flex w-full flex-wrap justify-center p-5">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h2>
      <div
        id="date-range-picker"
        date-rangepicker
        className="w-full flex items-center justify-center"
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="datepicker-range-start"
            name="start"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="datepicker-range-end"
            name="end"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date end"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex p-2">
        <button
          onClick={fetchReservations}
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Submit
        </button>
      </div>
      <div className="flex w-full flex-wrap p-2">
        <div className="w-full mt-8">
          <h3 className="text-xl font-semibold mb-4">Reservations</h3>
          <div className="grid mb-8 border border-gray-200 rounded-lg shadow-xs dark:border-gray-700 md:mb-12 md:grid-cols-4 bg-white dark:bg-gray-800">
            {reservations.map((reservation) => (
              <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Flight Number:
                  </h3>
                  <p className="my-4">{reservation.flightNumber}</p>
                </blockquote>
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Departure::
                  </h3>
                  <p className="my-4">{reservation.departure}</p>
                </blockquote>
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Arrival:
                  </h3>
                  <p className="my-4">{reservation.arrival}</p>
                </blockquote>
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Date:
                  </h3>
                  <p className="my-4">{reservation.date}</p>
                </blockquote>
                {user?.role === "admin" && (
                  <>
                    {reservation.guests.map((guest: any, index: number) => {
                      <figcaption className="flex items-center justify-center ">
                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                          <div>
                            {guest.name}, {guest.age} years old
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 ">
                            Seat: {guest.seatNo}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 ">
                            Phone: {guest.phone}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 ">
                            Address: {guest.address}
                          </div>
                        </div>
                      </figcaption>;
                    })}
                  </>
                )}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
