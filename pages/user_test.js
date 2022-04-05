import React from 'react';
import { useFetchUser } from '../lib/user';

export default function User_Test() {
  const { user, loading } = useFetchUser();
  if (!loading && !user){
    console.log('test')
  }

  return (
    <>
      <h4>Rendered user info on the client</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}