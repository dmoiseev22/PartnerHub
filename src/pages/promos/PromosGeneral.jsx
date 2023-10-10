import React from 'react'

import promo1 from '../../assets/promos/promo-1.png'
import promo2 from '../../assets/promos/promo-2.png'
import promo3 from '../../assets/promos/promo-3.png'

export default function PromosGeneral() {

    return (
        <>
            <div className='promo'>
                <img src={promo1} alt="blades for asphalt promo" loading="lazy" />
            </div>

            <div className='promo'>
                <img src={promo2} alt="drill bits promo" loading="lazy" />
            </div>

            <div className='promo'>
                <img src={promo3} alt="floor saw blades for granite promo" loading="lazy" />
            </div>
        </>
    )
}