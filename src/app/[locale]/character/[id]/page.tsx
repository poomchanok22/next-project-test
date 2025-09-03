
import { getCharacterById } from "@/actions/getCharacters";
import CharacterDetail from "@/components/CharacterDetail";
import { notFound } from "next/navigation";


export default async function CharacterByIdPage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params
  try{
    const character = await getCharacterById(id);
    return <CharacterDetail character={character} />;
  } catch(error) {
    console.log("Error")
    return notFound()
  }
  

}
