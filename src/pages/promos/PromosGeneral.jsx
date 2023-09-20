import React from 'react'

import promo1 from '../../assets/promos/promo-1.png'
import promo2 from '../../assets/promos/promo-2.png'
import promo3 from '../../assets/promos/promo-3.png'

export default function PromosGeneral() {

    return (
        <>
            <div className='promo'>
                <img src={promo1} alt="first promotion. blades for asphalt" loading="lazy" />
            </div>

            <div className='promo'>
                <img src={promo2} alt="second promotion. drill bits" loading="lazy" />
            </div>

            <div className='promo'>
                <img src={promo3} alt="third promotion. floor saw blades for granite" loading="lazy" />
            </div>
        </>
    )
}