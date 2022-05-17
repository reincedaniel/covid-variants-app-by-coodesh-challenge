import useSupabase from 'src/boot/supabase'
export default function useCovidVariant (){
    const {supabase} = useSupabase()

    const listAll = async ()=>{
      return await supabase
        .from('CovidVariant')
        .select('*')
     
    }


    return {
        listAll
    }

}
