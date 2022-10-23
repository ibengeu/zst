import { useState } from 'react';
import { TfiAngleRight, TfiAngleLeft } from 'react-icons/tfi';
import {
    AiFillHeart,
    AiOutlineSearch,
    AiOutlineUnorderedList,
    AiTwotoneStar
} from 'react-icons/ai';
import { BsFillMapFill } from 'react-icons/bs';
import { IListing } from './types/types';
import FilterContextProvider, { useFilterContext } from './context/ListingContext';
import useWindowSize from './utils/useWindowsize';

function App() {
    const { width } = useWindowSize();
    const [showMap, setShowMap] = useState(false);

    return (
        <>
            {width < 900 ? (
                <div className="h-screen flex items-center justify-center">
                    <p className="mr-3"> Home is where the heart is</p>{' '}
                    <AiFillHeart className="text-red-500" />
                </div>
            ) : (
                <FilterContextProvider>
                    <div className="w-full relative">
                        <header className="sticky top-0 z-50 bg-white">
                            <Navbar />
                            <ListingFilters />
                        </header>
                        {showMap ? <div id="map" className="h-full w-full"></div> : <Listing />}
                        <Footer />
                        {/* <button
                            type="button"
                            onClick={() => setShowMap(!showMap)}
                            className="bg-black text-white fixed bottom-20 mx-auto right-1/2 z-50 p-4 rounded-full flex items-center"
                        >
                            {showMap ? (
                                <p className='flex items-center text-sm'>
                                    Show List <AiOutlineUnorderedList className="text-white ml-2" />
                                </p>
                            ) : (
                                <p className='flex items-center text-sm'>
                                    {' '}
                                    Show Map <BsFillMapFill className="text-white ml-2" />
                                </p>
                            )}
                        </button> */}
                    </div>
                </FilterContextProvider>
            )}
        </>
    );
}

const Navbar = () => {
    return (
        <div className="flex justify-between items-center border-b-1  px-[80px] py-4 h-20 text-sm border-b">
            <div>
                <svg width="102" height="32" style={{ display: 'block', color: 'red' }}>
                    <path
                        d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
                        fill="currentcolor"
                    ></path>
                    <path
                        d="M41.6847 24.1196C40.8856 24.1196 40.1505 23.9594 39.4792 23.6391C38.808 23.3188 38.2327 22.8703 37.7212 22.2937C37.2098 21.7172 36.8263 21.0445 36.5386 20.3078C36.2509 19.539 36.123 18.7062 36.123 17.8093C36.123 16.9124 36.2829 16.0475 36.5705 15.2787C36.8582 14.51 37.2737 13.8373 37.7852 13.2287C38.2966 12.6521 38.9039 12.1716 39.6071 11.8513C40.3103 11.531 41.0455 11.3708 41.8765 11.3708C42.6756 11.3708 43.3788 11.531 44.0181 11.8833C44.6574 12.2037 45.1688 12.6841 45.5843 13.2927L45.6802 11.7232H48.6209V23.7992H45.6802L45.5843 22.0375C45.1688 22.6781 44.6254 23.1906 43.9222 23.575C43.2829 23.9274 42.5158 24.1196 41.6847 24.1196ZM42.4519 21.2367C43.0272 21.2367 43.5386 21.0765 44.0181 20.7882C44.4656 20.4679 44.8172 20.0515 45.1049 19.539C45.3606 19.0265 45.4884 18.4179 45.4884 17.7452C45.4884 17.0725 45.3606 16.4639 45.1049 15.9514C44.8492 15.4389 44.4656 15.0225 44.0181 14.7022C43.5706 14.3818 43.0272 14.2537 42.4519 14.2537C41.8765 14.2537 41.3651 14.4139 40.8856 14.7022C40.4382 15.0225 40.0866 15.4389 39.7989 15.9514C39.5432 16.4639 39.4153 17.0725 39.4153 17.7452C39.4153 18.4179 39.5432 19.0265 39.7989 19.539C40.0546 20.0515 40.4382 20.4679 40.8856 20.7882C41.3651 21.0765 41.8765 21.2367 42.4519 21.2367ZM53.6392 8.4559C53.6392 8.80825 53.5753 9.12858 53.4154 9.38483C53.2556 9.64109 53.0319 9.86531 52.7442 10.0255C52.4565 10.1856 52.1369 10.2497 51.8173 10.2497C51.4976 10.2497 51.178 10.1856 50.8903 10.0255C50.6026 9.86531 50.3789 9.64109 50.2191 9.38483C50.0592 9.09654 49.9953 8.80825 49.9953 8.4559C49.9953 8.10355 50.0592 7.78323 50.2191 7.52697C50.3789 7.23868 50.6026 7.04649 50.8903 6.88633C51.178 6.72617 51.4976 6.66211 51.8173 6.66211C52.1369 6.66211 52.4565 6.72617 52.7442 6.88633C53.0319 7.04649 53.2556 7.27072 53.4154 7.52697C53.5433 7.78323 53.6392 8.07152 53.6392 8.4559ZM50.2191 23.7672V11.6911H53.4154V23.7672H50.2191V23.7672ZM61.9498 14.8623V14.8943C61.79 14.8303 61.5982 14.7982 61.4383 14.7662C61.2466 14.7342 61.0867 14.7342 60.895 14.7342C60 14.7342 59.3287 14.9904 58.8812 15.535C58.4018 16.0795 58.178 16.8483 58.178 17.8413V23.7672H54.9817V11.6911H57.9223L58.0182 13.517C58.3379 12.8763 58.7214 12.3958 59.2648 12.0435C59.7762 11.6911 60.3835 11.531 61.0867 11.531C61.3105 11.531 61.5342 11.563 61.726 11.595C61.8219 11.6271 61.8858 11.6271 61.9498 11.6591V14.8623ZM63.2283 23.7672V6.72617H66.4247V13.2287C66.8722 12.6521 67.3836 12.2036 68.0229 11.8513C68.6622 11.531 69.3654 11.3388 70.1645 11.3388C70.9635 11.3388 71.6987 11.4989 72.3699 11.8193C73.0412 12.1396 73.6165 12.588 74.128 13.1646C74.6394 13.7412 75.0229 14.4139 75.3106 15.1506C75.5983 15.9194 75.7261 16.7522 75.7261 17.6491C75.7261 18.546 75.5663 19.4109 75.2787 20.1796C74.991 20.9484 74.5755 21.6211 74.064 22.2297C73.5526 22.8063 72.9453 23.2867 72.2421 23.6071C71.5389 23.9274 70.8037 24.0875 69.9727 24.0875C69.1736 24.0875 68.4704 23.9274 67.8311 23.575C67.1918 23.2547 66.6804 22.7742 66.2649 22.1656L66.169 23.7352L63.2283 23.7672ZM69.3973 21.2367C69.9727 21.2367 70.4841 21.0765 70.9635 20.7882C71.411 20.4679 71.7626 20.0515 72.0503 19.539C72.306 19.0265 72.4339 18.4179 72.4339 17.7452C72.4339 17.0725 72.306 16.4639 72.0503 15.9514C71.7626 15.4389 71.411 15.0225 70.9635 14.7022C70.5161 14.3818 69.9727 14.2537 69.3973 14.2537C68.822 14.2537 68.3106 14.4139 67.8311 14.7022C67.3836 15.0225 67.032 15.4389 66.7443 15.9514C66.4886 16.4639 66.3608 17.0725 66.3608 17.7452C66.3608 18.4179 66.4886 19.0265 66.7443 19.539C67 20.0515 67.3836 20.4679 67.8311 20.7882C68.3106 21.0765 68.822 21.2367 69.3973 21.2367ZM76.9408 23.7672V11.6911H79.8814L79.9773 13.2607C80.3289 12.6841 80.8084 12.2357 81.4157 11.8833C82.023 11.531 82.7262 11.3708 83.5253 11.3708C84.4203 11.3708 85.1874 11.595 85.8267 12.0115C86.4979 12.4279 87.0094 13.0365 87.361 13.8053C87.7126 14.574 87.9043 15.5029 87.9043 16.56V23.7992H84.708V16.9764C84.708 16.1436 84.5162 15.4709 84.1326 14.9904C83.7491 14.51 83.2376 14.2537 82.5664 14.2537C82.0869 14.2537 81.6714 14.3498 81.2878 14.574C80.9362 14.7982 80.6486 15.0865 80.4248 15.503C80.2011 15.8873 80.1052 16.3678 80.1052 16.8483V23.7672H76.9408V23.7672ZM89.5025 23.7672V6.72617H92.6989V13.2287C93.1464 12.6521 93.6578 12.2036 94.2971 11.8513C94.9364 11.531 95.6396 11.3388 96.4387 11.3388C97.2378 11.3388 97.9729 11.4989 98.6442 11.8193C99.3154 12.1396 99.8907 12.588 100.402 13.1646C100.914 13.7412 101.297 14.4139 101.585 15.1506C101.873 15.9194 102 16.7522 102 17.6491C102 18.546 101.841 19.4109 101.553 20.1796C101.265 20.9484 100.85 21.6211 100.338 22.2297C99.8268 22.8063 99.2195 23.2867 98.5163 23.6071C97.8131 23.9274 97.0779 24.0875 96.2469 24.0875C95.4478 24.0875 94.7446 23.9274 94.1053 23.575C93.466 23.2547 92.9546 22.7742 92.5391 22.1656L92.4432 23.7352L89.5025 23.7672ZM95.7035 21.2367C96.2788 21.2367 96.7903 21.0765 97.2697 20.7882C97.7172 20.4679 98.0688 20.0515 98.3565 19.539C98.6122 19.0265 98.7401 18.4179 98.7401 17.7452C98.7401 17.0725 98.6122 16.4639 98.3565 15.9514C98.1008 15.4389 97.7172 15.0225 97.2697 14.7022C96.8222 14.3818 96.2788 14.2537 95.7035 14.2537C95.1281 14.2537 94.6167 14.4139 94.1373 14.7022C93.6898 15.0225 93.3382 15.4389 93.0505 15.9514C92.7628 16.4639 92.6669 17.0725 92.6669 17.7452C92.6669 18.4179 92.7948 19.0265 93.0505 19.539C93.3062 20.0515 93.6898 20.4679 94.1373 20.7882C94.6167 21.0765 95.0962 21.2367 95.7035 21.2367Z"
                        fill="currentcolor"
                    ></path>
                </svg>
            </div>

            <div className="flex justify-center items-center border py-2 px-2 rounded-full  text-gray-800 cursor-pointer ml-40 shadow-md">
                <p className="px-4 text-sm border-r cursor-pointer">Anywhere</p>
                <p className="px-4 text-sm border-r cursor-pointer">Any week</p>

                <div className="flex items-center">
                    <p className="pl-2 pr-4 text-sm font-light text-gray-400 cursor-pointer">
                        Add guests
                    </p>
                    <div className="bg-[#FF385C] p-2 rounded-full">
                        <AiOutlineSearch className="text-white" />
                    </div>
                </div>
            </div>

            <div className="flex  items-center justify-between ">
                <p className="hover:bg-gray-100 p-4 rounded-full cursor-pointer transition-all">
                    Become a host
                </p>

                <div className="hover:bg-gray-100 p-4 rounded-full mr-2 cursor-pointer transition-all">
                    <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            display: 'block',
                            height: '16px',
                            width: '16px',
                            fill: 'currentcolor'
                        }}
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                    >
                        <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                    </svg>
                </div>

                <button
                    type="button"
                    className=" h-10 w-20 flex items-center justify-center border border-gray-200 rounded-full hover:shadow-lg transition-all ease-linear"
                >
                    <svg
                        viewBox="0 0 32 32"
                        className="mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            display: 'block',
                            fill: 'none',
                            height: '16px',
                            width: '16px',
                            stroke: 'currentcolor',
                            strokeWidth: '3px',
                            overflow: 'visible'
                        }}
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                    >
                        <g fill="none" fillRule="nonzero">
                            <path d="m2 16h28"></path>
                            <path d="m2 24h28"></path>
                            <path d="m2 8h28"></path>
                        </g>
                    </svg>

                    <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            display: 'block',
                            height: '32px',
                            width: '32px',
                            fill: 'gray'
                        }}
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                    >
                        <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

const ListingFilters = () => {
    const list = [
        {
            label: 'OMG!',
            img: 'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg',
            tag: 'omg'
        },
        {
            label: 'Beach',
            img: 'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg',
            tag: 'beach'
        },
        {
            label: 'Design',
            img: 'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
            tag: 'Design'
        },
        {
            label: 'Windmills!',
            img: 'https://a0.muscache.com/pictures/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg',
            tag: 'windmills'
        },
        {
            label: 'Islands!',
            img: 'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg',
            tag: 'Islands'
        },
        {
            label: 'shared homes',
            img: 'https://a0.muscache.com/pictures/52c8d856-33d0-445a-a040-a162374de100.jpg',
            tag: 'sharedhomes'
        },
        {
            label: 'Iconic Cities',
            img: 'https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg',
            tag: 'iconic'
        },
        {
            label: 'Mansions',
            img: 'https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg'
        },
        {
            label: 'Amazing Pools',
            img: 'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg'
        },
        {
            label: 'Caves',
            img: 'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg'
        },
        {
            label: 'Boats',
            img: 'https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg'
        },
        {
            label: 'Tropical',
            img: 'https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg'
        },
        {
            label: 'Beds and Breakfasts',
            img: 'https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg'
        },
        {
            label: 'Artic',
            img: 'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg'
        },

        {
            label: 'HouseBoats',
            img: 'https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg'
        },
        {
            label: 'BeachFront',
            img: 'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg'
        }
    ];

    const { state, dispatch } = useFilterContext();

    return (
        <div className="flex items-center px-[80px]  ">
            <ul className="flex gap-10 overflow-auto p-10 flex-1 items-end mr-4">
                {list.map((item) => (
                    <li
                        key={item.label}
                        onClick={() =>
                            dispatch({
                                type: 'SET_TAG',
                                payload: item.tag?.toLowerCase()
                            })
                        }
                        className={`${
                            state === item.tag?.toLowerCase() && ' border-b border-gray-800 pb-2'
                        } flex justify-center flex-col items-center opacity-60 hover:opacity-100 cursor-pointer flex-shrink-0`}
                    >
                        <img src={item.img} alt={item.label} className="h-6 w-6 mb-2" />
                        <p className="text-xs"> {item.label}</p>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                className="flex border text-xs items-center p-4 rounded-2xl gap-2"
            >
                <svg
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        display: 'block',
                        height: '14px',
                        width: '14px',
                        fill: 'currentcolor'
                    }}
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                >
                    <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                </svg>

                <p>Filters</p>
            </button>
        </div>
    );
};

const Listing = () => {
    const { state } = useFilterContext();

    const listings = [
        {
            label: 'Bordo, Norway',
            host: '5 bedroom duplex, norway',
            imgs: [
                'https://a0.muscache.com/im/pictures/a3656ba1-9c23-4d21-9313-156bbe3760f9.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/a9bfd4b1-df5e-41a7-8b17-12f8c29a7d9a.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/73d109fb-f629-4f28-9dcb-3c539c54a17b.jpg?im_w=720'
            ],
            availableDates: 'Nov 7 - 14',
            costPerNight: '107',
            rating: '4.95',
            tag: ['beach', 'all']
        },
        {
            label: 'Ibestad, Norway',
            host: 'self-con, Norway',
            imgs: [
                'https://a0.muscache.com/im/pictures/639976dc-f24b-4409-94e4-ff811080305f.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/miso/Hosting-44574015/original/bfb8b5d1-f253-454a-91fa-bd644076b388.jpeg?im_w=720',
                'https://a0.muscache.com/im/pictures/0757ead1-c63c-4766-8972-1d60bded31b5.jpg?im_w=720'
            ],
            availableDates: 'Nov 10 - 20',
            costPerNight: '107',
            rating: '4.95',
            tag: ['design', 'all']
        },
        {
            label: 'Ade, Norway',
            host: '5 bedroom duplex, norway',
            imgs: [
                'https://a0.muscache.com/im/pictures/8ed94d0a-7131-42fd-9431-68d568c9875d.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/fcdaba72-7297-4f60-92a4-87758ad07f26.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/b09a1edd-b676-4b70-bced-48a60422afcf.jpg?im_w=720'
            ],
            availableDates: 'Nov 7 - 14',
            costPerNight: '107',
            rating: '4.95',
            tag: ['iconic', 'all']
        },
        {
            label: 'Bralanga, Sweden',
            host: 'open space living, Sweden',
            imgs: [
                'https://a0.muscache.com/im/pictures/miso/Hosting-713793474951553871/original/2ac03203-3d06-441c-bc82-77f28ac26c6a.jpeg?im_w=720',
                'https://a0.muscache.com/im/pictures/miso/Hosting-713793474951553871/original/467c73f5-711a-49c3-a358-bad81cfe4a02.jpeg?im_w=720',
                'https://a0.muscache.com/im/pictures/miso/Hosting-713793474951553871/original/06ec5b7b-0197-47f8-92e8-bffa074f9b1c.jpeg?im_w=720'
            ],
            availableDates: 'Nov 7 - 14',
            costPerNight: '107',
            rating: '4.95',
            tag: ['omg', 'all']
        },
        {
            label: 'Osterbuch, Germany',
            host: '5 bedroom windmill, Germany',
            imgs: [
                'https://a0.muscache.com/im/pictures/1141548d-0059-4094-b4ac-aa8fdd23e31f.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/b7adc403-12fe-42b9-bd43-ef3edea8296c.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/e464b5d5-c3a2-4e0b-a329-0b81112f3d54.jpg?im_w=720'
            ],
            availableDates: 'Nov 7 - 14',
            costPerNight: '107',
            rating: '4.95',
            tag: ['windmills', 'all']
        },
        {
            label: 'Badachro, UK',
            host: 'Island boy, Uk',
            imgs: [
                'https://a0.muscache.com/im/pictures/4d268e76-949f-4de7-a10b-b4b48ea3355d.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/4f4e82b1-3270-4c5a-9628-83ab64ae8f58.jpg?im_w=720',
                'https://a0.muscache.com/im/pictures/fe2a079c-e2b3-4832-b814-5295abf411ea.jpg?im_w=720'
            ],
            availableDates: 'Nov 7 - 14',
            costPerNight: '107',
            rating: '4.95',
            tag: ['islands', 'all']
        }
    ];

    return (
        <div className="px-4 md:px-[80px] pb-5 min-h-screen">
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listings
                    .filter((item) => item.tag.includes(state))
                    .map((listing, index) => (
                        <ListingItem listing={listing} key={index} />
                    ))}
            </ul>
        </div>
    );
};

const ListingItem = ({ listing }: { listing: IListing }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [ImgIdx, setImgIdx] = useState(0);
    const [translateVal, setTranslateVal] = useState(100);

    const goForward = () => {
        if (ImgIdx < listing.imgs.length - 1) {
            setImgIdx(ImgIdx + 1);
            setTranslateVal(translateVal + 100);
        }
    };

    const goBackward = () => {
        if (ImgIdx > 0) {
            setImgIdx(ImgIdx - 1);
            setTranslateVal(translateVal - 100);
        }
    };

    return (
        <li key={listing.label}>
            <div className="h-72 md:h-48 lg:h-72 w-auto relative  flex overflow-clip ">
                {ImgIdx !== 0 && (
                    <button
                        onClick={goBackward}
                        type="button"
                        className="bg-white z-30 flex p-0 shadow-lg border rounded-full justify-center items-center  absolute left-2 top-[50%] h-8 w-8 -translate-y-1/2"
                    >
                        <TfiAngleLeft className="text-sm text-center" />
                    </button>
                )}

                {ImgIdx !== listing.imgs.length - 1 && (
                    <button
                        onClick={goForward}
                        type="button"
                        className="bg-white z-30 flex p-0 shadow-lg  border rounded-full justify-center items-center   absolute right-2 top-[50%] h-8 w-8 -translate-y-1/2"
                    >
                        <TfiAngleRight className="text-sm text-center" />
                    </button>
                )}
                {listing.imgs.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={listing.label}
                        className={`h-full transform w-full object-cover flex-shrink-0 rounded-xl `}
                    />
                ))}

                <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setHasLiked(!hasLiked)}
                    style={{
                        display: 'block',
                        fill: hasLiked ? 'red' : 'rgba(0, 0, 0, 0.5)',
                        height: '24px',
                        width: '24px',
                        stroke: 'white',
                        strokeWidth: '2px',
                        overflow: 'visible',
                        position: 'absolute',
                        right: '24px',
                        top: '16px',
                        cursor: 'pointer'
                    }}
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                >
                    <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                </svg>
            </div>

            <div className="flex items-center justify-between mt-4">
                <p className="font-medium text-md  text-gray-800">{listing.host}</p>
                <p className="flex gap-2 items-center">
                    <AiTwotoneStar />
                    {listing.rating}
                </p>
            </div>
            <p className="font-light leading-loose text-sm text-gray-500">{listing.label}</p>
            <p className="font-light leading-loose text-sm text-gray-500">
                {listing.availableDates}
            </p>
            <p className="font-normal leading-loose text-lg  ">${listing.costPerNight}</p>
        </li>
    );
};

const Footer = () => {
    return (
        <div className="sticky bottom-0 px-[80px] py-4 flex justify-between bg-white z-50 text-sm">
            <div className="gap-4 flex font-light">
                <span>&copy;{new Date().getFullYear()}</span> <span>Airbnb Inc.</span>{' '}
                <span>Privacy</span>
                <span>sitemap</span>
                <span>Destinations</span>
            </div>
            <div className="gap-4 flex">
                <span className="flex gap-4 items-center">
                    <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            display: 'block',
                            height: '16px',
                            width: '16px',
                            fill: 'currentcolor'
                        }}
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                    >
                        <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                    </svg>
                    English(US)
                </span>
                <span className="flex gap-4 items-end">
                    <span>$</span> USD
                </span>
                <span className="flex gap-4 items-center">
                    Support & Resources{' '}
                    <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            display: 'block',
                            fill: 'none',
                            height: '16px',
                            width: '16px',
                            stroke: 'currentcolor',
                            strokeWidth: '4px',
                            overflow: 'visible'
                        }}
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                    >
                        <g fill="none">
                            <path d="m4 20 11.2928932-11.29289322c.3905243-.39052429 1.0236893-.39052429 1.4142136 0l11.2928932 11.29289322"></path>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    );
};
export default App;
