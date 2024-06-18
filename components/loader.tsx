"use client"
import React from 'react';
import { DNA,MagnifyingGlass,BallTriangle } from 'react-loader-spinner';


const Loader = () => {
  return (
    <BallTriangle
    height={200}
    width={200}
    radius={5}
    color="	#0D9494"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />
  );
};

export default Loader;