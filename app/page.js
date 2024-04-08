"use client";
import NavBar from './components/NavBar';
import Link from 'next/link';

export default function Page() {
    return (
        <main>
          <NavBar/>
          <div>
            <p className="text-center">Welcome to Ink Time, the best place to schedule your next tattoo appointment.</p>
            <Link href="/SchedulingPage">
              <p className="text-center">Schedule an Appointment</p>
            </Link>




          </div>
        </main>
    );
    }
