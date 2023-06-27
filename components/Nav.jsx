"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // to use this, we must change this component to use 'use client' bcs by default next js component is server-side components
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    // allow us to sign in using google and next auth
    setProviders(); // call setProviders here
  }, []) // empty array - runs at start only

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='Promptopia Logo' width={30} height={30} className='object-contain' />
        <p className='logo_text'></p>
      </Link>

      {/* Desktop Navigation */}
      {/* flex - visible but usually it is hidden */}
      {/* kalau kat mobile view, button create post ni akan hidden dan appear kat large screen je */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>Create Post</Link>

            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>

            <Link href="/profile">
              <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full' alt='profile' />
            </Link>
          </div>
        ) : (
          <>
            {/* check if we have access to provider */}
            {providers && 
              Object.values(providers).map((provider) => (
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full' alt='profile' onClick={() => setToggleDropDown((prev) => !prev)} />
            {/* when set something, it is not recommended to use setToggleDropDown(!toggleDropDown) bcs it will lead to unexpected behaviour */}

            {toggleDropDown && (
              <div className='dropdown'>
                <Link href="/profile" className='dropdown_link' onClick={() => setToggleDropDown(false)}>My Profile</Link>

                <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggleDropDown(false)}>Create Prompt</Link>

                <button 
                  type='button' 
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* check if we have access to provider */}
            {providers && 
              Object.values(providers).map((provider) => (
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav