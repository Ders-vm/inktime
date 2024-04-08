import React from 'react'; // Add the missing import statement for React library
import Link from 'next/link';

export default function NavBar() {
    return (
        <div>
            <p>
                <Link href="/">
                    <p>Ink Time&nbsp;</p>  
                </Link>
            </p>
        </div>
    );
}


