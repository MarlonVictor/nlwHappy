import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import mapMarkerImg from '../../assets/images/map-marker.svg';

import './styles.scss';

export default function Sidebar() {
    const { goBack } = useHistory();

    return (
        <aside>
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}