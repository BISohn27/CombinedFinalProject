import React, { useEffect,useState,useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const { kakao } = window;

function MapContainer ({array, references, shown, mapStyle,state, redirectState}) {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const mapRef = useRef();
    const markerRef = useRef([]);

    const removeMarker = () => {
        for ( var i = 0; i < markerRef.current.length; i++ ) {
            markerRef.current[i].setMap(null);
        }
        markerRef.current = [];
    };

    useEffect(()=>{
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div  
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 6 // 지도의 확대 레벨
        };
        mapRef.current = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    },[])
    
    useEffect(()=>{
        if(redirectState === true){
            removeMarker();
        }
        const geocoder = new kakao.maps.services.Geocoder();
        
        for(let i=0; i< array.length; i++){
            geocoder.addressSearch(array[i].road_address, function(result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    const position =  new kakao.maps.LatLng(result[0].y, result[0].x);
                    const marker = new kakao.maps.Marker({
                        map: mapRef.current,   // 마커를 표시할 지도
                        position: position  // 마커의 위치
                    });
                    markerRef.current.push(marker);
                    // 마커에 표시할 인포윈도우를 생성합니다 
                    const infowindow = new kakao.maps.InfoWindow({
                        content: `
                                <div style="color:black; width: 20vw; text-align:center; font-weight: bolder;">
                                    ${array[i].ename}
                                </div>
                                <div style="text-align:center; width: 20vw;">
                                    ${array[i].road_address}
                                </div>
                                ` // 인포윈도i우에 표시할 내용
                    });
                    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(mapRef.current, marker, infowindow));
                    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
                    if(references !== undefined) {
                            kakao.maps.event.addListener(marker, 'click', function() {
                                references[i].current.scrollIntoView({behavior: "smooth"});
                            });
                    } else{
                        kakao.maps.event.addListener(marker, 'click', function() {
                            // console.log(`${result[0].y},${result[0].x}`);
                            // window.open(`https://map.naver.com/v5/directions/-/-/-/transit?c=${result[0].y},${result[0].x},15,0,0,0,dh`, '_blank');
                        });
                    }

                    if(i === shown-1 ){
                        mapRef.current.setCenter(position);
                    }
                }
            });
        }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
    },[array]);

    return (
        <div id='map' style={mapStyle? mapStyle : {
            width: '70%', 
            height: isMobile ? '30vh': '40vh'
        }}></div>
    )
}

export default MapContainer;
