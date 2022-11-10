import { useEffect, useState } from "react"
import CardService from "./CardService"
import supabase from '../config/supabaseClient'
import Loader from "./Loader"
import { useDebounce } from "use-debounce"

function ListService() {
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchName, setSearchName] = useState('')
    const [debounceValue] = useDebounce(searchName, 1000);
    const [isAscending, setIsAscending] = useState(1)

    const loadServices = async () => {
        try {
            setIsLoading(true)

            let { data: services } = await supabase
                .from('services')
                .select('*')
                .ilike('name', `%${debounceValue}%`)
                .order('price', {ascending: isAscending})

            setServices(services)
        } catch (_) {
            console.log('error while getting services')
        } finally {
            setIsLoading(false)
        }
    }

    const serviceMap = (
        services.map((service) => {
            return (
                <div key={service.id} class="col-3 mb-3">
                    <CardService service={service} />
                </div>
            )
        })
    )

    const showServices = (
        services.length ? serviceMap : (
            <div class="alert alert-warning" role="alert">
                No service found.
            </div>
        )
    )

    const showLoader = (
        <div class="col-12 text-center">
            <Loader />
        </div>
    )

    const onSearchChange = (event) => {
        setIsLoading(true)
        const value = event.target.value
        setSearchName(value)
    }

    const onOrderChange = (event) => {        
        const value = parseInt(event.target.value)
        setIsAscending(value)
    }

    useEffect(() => {
        loadServices();
    }, [debounceValue, isAscending]);

    return (
        <div>
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <span class="text-center text-montserat fs-3 fw-bold fc-grey border-bottom-grey">List services</span>
                </div>
            </div>

            <div class="row mt-5 justify-content-md-center">
                <div class="col-6">
                    <input value={searchName} onChange={onSearchChange} class="form-control form-control-lg" type="text" placeholder="Search by service ..." />
                </div>
                <div class="col-2">
                    <select value={isAscending} onChange={onOrderChange} class="custom-select custom-select-lg mb-3">
                        <option selected disabled>Price</option>
                        <option value={1}>Low to High</option>
                        <option value={0}>High to Low</option>
                    </select>
                </div>
            </div>

            <div class="row mt-5">
                {isLoading ? showLoader : showServices}
            </div>
        </div>
    )
}

export default ListService