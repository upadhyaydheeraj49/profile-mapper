import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api'

const MapComponent = ({lat, lng}) => {
    const {isLoaded} = useLoadScript({googleMapsApiKey: 'apikey'});
    if(!isLoaded) return <div>Loading Map ... </div>

    return (
        <GoogleMap zoom={10} center={{lat, lng}} mapContainerStyle={{height: '400px', width: '100%'}}>
            <Marker position={{lat, lng}} />
        </GoogleMap>
    )
}
export default MapComponent