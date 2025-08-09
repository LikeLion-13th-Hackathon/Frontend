import React, { useEffect, useRef, useState } from 'react';

export default function KakaoMap() {
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);
  const [endAddress, setEndAddress] = useState('');
  const [map, setMap] = useState(null);
  const currentMarkerRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const kakao = window.kakao;
        const mapInstance = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 4,
        });

        setMap(mapInstance);
        geocoderRef.current = new kakao.maps.services.Geocoder();

        // 현재 위치 한 번 가져와서 초기 마커 표시
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const pos = new kakao.maps.LatLng(lat, lng);

              currentMarkerRef.current = new kakao.maps.Marker({
                map: mapInstance,
                position: pos,
                title: '현재 위치',
              });

              mapInstance.setCenter(pos);
            },
            (err) => console.error('초기 위치 가져오기 실패:', err),
            { enableHighAccuracy: true }
          );

          // 실시간 위치 추적
          navigator.geolocation.watchPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const pos = new kakao.maps.LatLng(lat, lng);

              if (currentMarkerRef.current) {
                currentMarkerRef.current.setPosition(pos);
              }

              mapInstance.setCenter(pos);
            },
            (err) => console.error('위치 추적 실패:', err),
            { enableHighAccuracy: true }
          );
        }
      });
    };

    document.head.appendChild(script);
  }, []);

  const drawRoute = () => {
    const kakao = window.kakao;
    const mapInstance = mapRef.current.map || map;
    const geocoder = geocoderRef.current;

    if (!endAddress) {
      alert('도착지를 입력해주세요.');
      return;
    }

    // 현재 위치 먼저 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      const origin = `${position.coords.longitude},${position.coords.latitude}`;

      // 도착지 주소 → 좌표 변환
      geocoder.addressSearch(endAddress, async (endResult, status) => {
        if (status !== kakao.maps.services.Status.OK) {
          alert('도착지 주소를 찾을 수 없습니다.');
          return;
        }

        const dest = `${endResult[0].x},${endResult[0].y}`;

        try {
          const response = await fetch(
            `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${dest}&priority=RECOMMEND`,
            {
              headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOMOBILITY_KEY}`,
              },
            }
          );

          const data = await response.json();

          const coords = data.routes[0].sections[0].roads.flatMap((road) =>
            road.vertexes.reduce((acc, cur, idx, arr) => {
              if (idx % 2 === 0)
                acc.push(new kakao.maps.LatLng(arr[idx + 1], cur));
              return acc;
            }, [])
          );

          // 이전 경로 제거
          if (polylineRef.current) polylineRef.current.setMap(null);

          polylineRef.current = new kakao.maps.Polyline({
            map: mapInstance,
            path: coords,
            strokeWeight: 5,
            strokeColor: '#0f62fe',
            strokeOpacity: 0.9,
            strokeStyle: 'solid',
          });

          // 도착지 마커 추가
          new kakao.maps.Marker({
            map: mapInstance,
            position: coords[coords.length - 1],
            title: '도착지',
          });

          // 지도 범위 자동 조정
          const bounds = new kakao.maps.LatLngBounds();
          coords.forEach((coord) => bounds.extend(coord));
          mapInstance.setBounds(bounds);
        } catch (err) {
          console.error('도보 경로 요청 실패:', err);
          alert('도보 경로를 불러오는 중 오류가 발생했습니다.');
        }
      });
    });
  };

  return (
    <div>
      <h3>🚶 실시간 도보 내비게이션</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="도착지 입력 (예: 강남역)"
          value={endAddress}
          onChange={(e) => setEndAddress(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <button onClick={drawRoute}>도보 경로 표시</button>
      </div>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
      ></div>
    </div>
  );
}
