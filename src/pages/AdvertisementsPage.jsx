import React, { useState, useEffect } from 'react';
import MarketService from '../API/MarketService';
import AdvertismentList from '../components/advertisementsList/AdvertisementsList';
import CreateAdvertisementModal from '../components/modal/CreateAdvirtismentModal';
import useDebounce from '../hooks/useDebounce';

function AdvertisementsPage() {
    const [advertisements, setAdvertisements] = useState([]);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAdvertisements, setTotalAdvertisements] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    
    // Новые состояния для фильтров
    const [minPrice, setMinPrice] = useState('');
    const [minViews, setMinViews] = useState('');
    const [minLikes, setMinLikes] = useState('');

    useEffect(() => {
        fetchAdvertisements();
    }, [limit, currentPage, debouncedSearchQuery, minPrice, minViews, minLikes]);

    const fetchAdvertisements = async () => {
        setIsLoading(true);
        const start = (currentPage - 1) * limit;

        try {
            const data = await MarketService.getAllAdvertisements();
            console.log("All advertisements fetched:", data);

            // Фильтруем данные по запросу и дополнительным фильтрам
            const filteredData = data.filter(ad => {
                const matchesSearch = debouncedSearchQuery.trim()
                    ? ad.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                    : true;
                const matchesPrice = minPrice ? ad.price >= minPrice : true;
                const matchesViews = minViews ? ad.views >= minViews : true;
                const matchesLikes = minLikes ? ad.likes >= minLikes : true;

                return matchesSearch && matchesPrice && matchesViews && matchesLikes;
            });

            // Устанавливаем обрезанные данные
            setAdvertisements(filteredData.slice(start, start + limit));
            setTotalAdvertisements(filteredData.length);
        } catch (error) {
            console.error("Error fetching advertisements:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMinViewsChange = (e) => {
        setMinViews(e.target.value);
    };

    const handleMinLikesChange = (e) => {
        setMinLikes(e.target.value);
    };

    const totalPages = Math.ceil(totalAdvertisements / limit);

    const handleAddAdvertisement = () => {
        fetchAdvertisements();
    };

    return (
      <div className="container" style={{marginTop: "1rem"}}>
  
          {/* Поиск по названию */}
          <input 
              type="text" 
              className="form-control mb-3" 
              placeholder="Search by title" 
              value={searchQuery} 
              onChange={handleSearch} 
          />
  
          {/* Выбор количества объявлений на странице */}
          <select 
              className="form-select mb-3" 
              value={limit} 
              onChange={handleLimitChange}
          >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
          </select>
  
          {/* Фильтры */}
          <div className="mb-3">
              <input 
                  type="number" 
                  className="form-control mb-2" 
                  placeholder="Min Price" 
                  value={minPrice} 
                  onChange={handleMinPriceChange} 
              />
              <input 
                  type="number" 
                  className="form-control mb-2" 
                  placeholder="Min Views" 
                  value={minViews} 
                  onChange={handleMinViewsChange} 
              />
              <input 
                  type="number" 
                  className="form-control mb-2" 
                  placeholder="Min Likes" 
                  value={minLikes} 
                  onChange={handleMinLikesChange} 
              />
          </div>
          {/* Кнопка для открытия модального окна создания нового объявления */}
          <div className="text-center">
              <button 
                  className="btn btn-success" 
                  onClick={() => setIsModalOpen(true)}
              >
                  Create New Advertisement
              </button>
          </div>
          {/* Модальное окно для создания объявления */}
          {isModalOpen && (
              <CreateAdvertisementModal 
                  onClose={() => setIsModalOpen(false)} 
                  onAdd={handleAddAdvertisement} 
              />
          )}

          {/* Проверка состояния загрузки */}
          {isLoading ? (
              <h2 className="text-center">Loading...</h2>
          ) : advertisements.length ? (
              <AdvertismentList advertisements={advertisements} />
          ) : (
              <h2 className="text-center">--- Can't Find Advertisements ---</h2>
          )}
  
          {/* Пагинация */}
          <div className="d-flex justify-content-center my-4">
              {Array.from({ length: totalPages }, (_, i) => (
                  <button 
                      key={i} 
                      className={`btn btn-outline-primary mx-1 ${currentPage === i + 1 ? 'active' : ''}`} 
                      onClick={() => setCurrentPage(i + 1)} 
                      disabled={currentPage === i + 1}
                  >
                      {i + 1}
                  </button>
              ))}
          </div>
      </div>
  );
  
}

export default AdvertisementsPage;
