import { isVisible } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react'

export interface Info  {
    id: number;
    name: string;
  }  

  export interface DetailsProps {
    avatar: string;
    details: {
        city: string;
        company: string;
        position: string;
    }
  }

const Details = ((props : {data: string, info: Info | null, isVisible: boolean})=> {
    const [details, setDetails] = useState<DetailsProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getDetailsData = async () => {
        if (!props.info) {
          return
        }
        try {
            setIsLoading(true);
            const response = await fetch(props.data + props.info.id.toString() + '.json');
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const detailsData: DetailsProps = await response.json();
            setDetails(detailsData);
        } catch (e) {
            console.error(e)
        } finally {
          setIsLoading(false);
        }
    }

    useEffect(() => {
      if (!props.info || !props.isVisible) {
        return;
      }
      getDetailsData();
      }, [props.data, props.info?.id]);

      if (isLoading) {
        return <div className='loading'>Loading...</div>; 
      }
 
    return props.isVisible ? ( 
        <div className='details' key={props.info?.id}>
          <img src={details?.avatar} alt='avatar' />
          <h3>{props.info?.name}</h3>
          <p>City: {details?.details.city}</p>
          <p>Company: {details?.details.company}</p>
          <p>Position: {details?.details.position}</p>
        </div>
    ) : null
})

export default Details
