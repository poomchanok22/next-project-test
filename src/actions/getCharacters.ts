"use server"

import { GetCharactersGQL,getCharacterByIdGQL } from '@/gql/characterQuery';
import  client  from '../lib/apolloClient';


export async function getCharacters(page: number = 1) {
  const { data } = await client.query({
    query: GetCharactersGQL,
    variables: { page },
    fetchPolicy: "no-cache", 
  });

  return data.characters;
}

export async function getCharacterById(id: string) {
  const { data }  = await client.query({
    query: getCharacterByIdGQL,
    variables: { id },
    fetchPolicy: 'no-cache'
  })
  return data.character
}