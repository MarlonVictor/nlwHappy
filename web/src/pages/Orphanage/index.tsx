import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/mapIcon';

import './styles.scss';


interface Orghanage {
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
        id: number;
        url: string;
    }>
}

interface RootParams {
    id: string;
}


export default function Orphanage() {
    const params = useParams<RootParams>()
    const [orphanage, setOrphanage] = useState<Orghanage>()
    const [activeImage, setActiveImage] = useState(0)
    
    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(res => setOrphanage(res.data))
    }, [params.id])

    if(!orphanage) {
        return <p>Carregando...</p>
    }


    return (
        <div id="page-orphanage">
            <Sidebar />

            <main>
                <div className="orphanage-details">
                    {orphanage.images.length > 0 && <img src={orphanage.images[activeImage].url} alt={orphanage.name} />}

                    <div className="images">
                        {orphanage.images.map((image, index) => (
                                <button 
                                    key={image.id} 
                                    type="button"
                                    onClick={() => setActiveImage(index)}
                                    className={activeImage === index ? 'active' : ''} 
                                >
                                    <img src={image.url} alt={orphanage.name} />
                                </button>
                            ))
                        }
                    </div>

                    <div className="orphanage-details-content">
                        <h1>{orphanage.name}</h1>
                        <p>{orphanage.about}</p>

                        <div className="map-container">
                            <Map 
                                center={[orphanage.latitude, orphanage.longitude]} 
                                zoom={16} 
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                            </Map>
                            <footer>
                                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destionation=${orphanage.latitude},${orphanage.longitude}`}>
                                    Ver rotas no Google Maps
                                </a>
                            </footer>
                        </div>

                        <hr/>

                        <h2>Instruções para visita</h2>
                        <p>{orphanage.instructions}</p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6" />
                                Segunda à Sexta <br />
                                {orphanage.opening_hours}
                            </div>
                            {orphanage.open_on_weekends ? (
                                <div className="open-on-weekends">
                                    <FiInfo size={32} color="#39CC83" />
                                    Atendemos <br />
                                    fim de semana
                                </div>
                            ) : (
                                <div className="open-on-weekends dont-open">
                                    <FiInfo size={32} color="#FF669D" />
                                    Não atendemos <br />
                                    fim de semana
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}