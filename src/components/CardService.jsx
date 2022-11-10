function CardService(props) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR'        
    });

    return (
        <div class="card pointer h-100">
            <div class="card-body text-center">
                <div class="">
                    <img class="img-fluid" src={props.service.url} />
                </div>
                <div class="border-top my-3 text-muted"></div>
                <div class="my-4">
                    <h4>{props.service.name}</h4>
                    <p class="text-description mb-1 mt-3 text-left">{props.service.description}</p>
                </div>
                <div class="border-top my-3 divider"></div>
                <div>
                    <h4 class="txt-yellow fw-bold">{formatter.format(props.service.price)}</h4>
                </div>
            </div>
        </div>
    )
}

export default CardService