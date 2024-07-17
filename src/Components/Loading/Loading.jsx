// import Style from  './Loading.module.css';
import { ColorRing } from 'react-loader-spinner'

export default function Loading() {
    return <>

        <div style={{top:'20%'}} className="position-absolute start-50 " >
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#d4d4d4' , '#d5d5d5','#d7d7d7' , '#d9d9d9','#dbdbdb']}
            />
        </div>
    </>
}
