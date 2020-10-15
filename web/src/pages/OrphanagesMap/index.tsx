import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import api from '../../services/api';
import mapMarkerImg from '../../assets/images/map-marker.svg';

import './styles.scss';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [48, 58],
    iconAnchor: [24, 58],
    popupAnchor: [170, 2]
})

interface Orghanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const OrphanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orghanage[]>([])
    
    useEffect(() => {
        api.get('orphanages').then(res => setOrphanages(res.data))
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>São João de Meriti</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map center={[-22.7770746, -43.3254194]} zoom={13} style={{ width: '100%', height: '100%' }}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                {orphanages.map(orphanage => (
                    <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon}>
                        <Popup closeButton={false} minWidth={230} maxWidth={230} className='map-popup'>
                            {orphanage.name}
                            <Link to={`orphanages/${orphanage.id}`}>
                                <FiArrowRight size={18} color="#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;