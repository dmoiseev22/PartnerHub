import React from 'react';

export default function ProductDots({ life , finish , speed }){


    const RedDot = () => (
        <div className="red-dot"></div>
      );
      
    const EmptyDot = () => (
        <div className="empty-dot"></div>
      );
      
    const generateDots = (count) => {
        const dots = [];
        for (let i = 0; i < count; i++) {
          dots.push(<RedDot key={i} />);
        }
        
        const emptyDotCount = Math.max(0, 5 - count);
        
        for (let i = 0; i < emptyDotCount; i++) {
          dots.push(<EmptyDot key={`empty-${i}`} />);
        }
        return dots;
      };

    return (
        <div>
            <div className="product-card-technical-detail dots">
                <div className='dots-flex'>
                    <p><b>Life</b>: </p>
                    <div>{generateDots(life)}</div>
                </div> 

                <div className='dots-flex'>
                    <p><b>Speed</b>: </p>
                    <div>{generateDots(speed)}</div>
                </div> 

                <div className='dots-flex'>
                    <p><b>Finish</b>: </p>
                    <div>{generateDots(finish)}</div>
                </div> 
            </div>
        </div>
    );
}