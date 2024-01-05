import { useEffect, useState } from 'react'
import { Info } from './Details';


interface ListItem {
    id: number;
    name: string;
  }
  const List = ({ data, setSelectedInfo, setIsDetailsVisible }: { data: string, setSelectedInfo: (info: Info | null) => void, setIsDetailsVisible: (isVisible: boolean) => void }) => {
    const [list, setList] = useState<ListItem[]>([])
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const  getList = async () => {

        try {
            const response = await fetch(data + 'users.json');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        
        const listData: ListItem[] = await response.json();
        setList(listData)
        }
        catch (e) {
            console.error(e)
        }
     
    }

    const getDetails = async (id: number) => {
        const selectedInfo = list.find(item => item.id === id) || null;
        if (selectedInfo) {
            if (selectedInfo.id === selectedItemId) {
              setSelectedItemId(null);
              setIsDetailsVisible(false);
            } else {
              setSelectedItemId(selectedInfo.id);
              setSelectedInfo(selectedInfo);
              setIsDetailsVisible(true);
            }
        }
    }
    useEffect(() => {
        getList();
    },[])

    return (
        <>
            <ul className='list'>
                {list.map(el => <li key={el.id} onClick={() => getDetails(el.id)}>{el.name}</li>)}
            </ul>
        </>
  
    )
}

export default List