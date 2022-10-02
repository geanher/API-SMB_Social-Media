import "./Facebook.css"
import * as Constants from "./Constants"

interface Props {
    text: string
    link: string
}

export const FacebookCard: React.FC<Props> = (Props) => {
    return (
        <>
            <div id="wrapper">

                <header className='cf'>
                    <img src="http://2016.igem.org/wiki/images/e/e0/Uclascrolldown.png" className="arrow" alt=""/>
                    <img className='profile-pic' src={Constants.URL_PROFILE_CARD_IGNIS} alt=""/>
                    <h1 className="name">
                        <a href="/#">Ignis Gravitas</a>
                    </h1>
                    <p className="date">2 hr ago</p>
                </header>

                <p className="status">{Props.text}</p>
                <img className="img-content" src={Props.link} alt="" />

                <div className="action">
                    <div className="like">
                        <a href="/#">
                            <img src="https://1.bp.blogspot.com/-qns_lZPjg0I/VWY2dO1HN-I/AAAAAAAACVA/akLTMY7RJSk/s1600/Thumbs-up-facebook-icon-small.png" alt="thumbs up" />
                            <p>Like</p>
                        </a>
                    </div>

                    <div className="comment">
                        <a href="/#">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASgAAACrCAMAAADiivHpAAAAYFBMVEX////u7u6AgIDt7e339/f09PT6+vrx8fH8/Px9fX16enqMjIyYmJicnJyBgYGPj4/i4uLAwMCpqamioqK6urrNzc3Z2dmHh4fV1dXf39/Dw8Ovr6+oqKizs7PX19fBwcGs8MQXAAAOiElEQVR4nO1d64KjKgyWKqK009ppO/Yy3X3/tzwq6CQIAkqrc1Z+7C7b9iN+hpBwCVHUlITUJc6aShY3lVR8JCqJqDRfI1RUWFNhokLFRwhOVFIbtg6OQTjqBRdYVAkXrUStRK1E/RaitE/2rxAVu7WOnyyGrcew9Ri2bsOWcKSuxQxiE4gd+4lKLKJiOLOoLVGJKLQpEyrTEV4PNwVbQ3wMiY9H6YjxpcbWl5pBbJs6BxQ1HhaVOHdlS+sEtk7sZgIRhSwDcez3A6LG4UV9DVFM6oPUXYkgahKh+bdsKDJXWFPLYCWFcAmEk9gZY7+BKMZYcX8+H3U51eXjJMpHVXa73YcoO1gO3R/N3wf1a+bKTlf5vlZSLJ0oVjy3vCr5nIWXjxsLTVTclG6Erks3Qtflp+PXpW29KW3rTRGtFzvONwsoOd8VFlHlkye2J6fyybOmJKwuRFRS0lRS8ZmoJE0lEl+joMKYqFDC6O2D53NT1JacfxTUICqouD65NJMjvTjcUdl5OTTVJefPIZvi63DKrxMPorStJ1Wvm5satfBDkRiJmisoLvaLUidR8s0tyuYjStf1inyBPFWF3wJrlI+NIv1IM14oTxVThSKqb/zeEgVHPZYK26+pJOJ7okJFhXYVusR+1xaWpUDUTm6GntxMg3zyAT+K9vwoovejCNstmKd8C3TE4kd1XUXjR5nNs7NnTp98j4Xb62UefJ4wtGia50+6jBCG3Hp+Qc7bUgcU1Z9dUNP84yfC4eZwB31kqvy0AiqqNPyLLIIo+pGrNJ3+1FMdtGhKnCR1pyeyvza/SiB2M9awbsKAVQ61fDIpnfFhYulRsxa7KvGnSlW+Y0sgKroqCsW/iwzC+U1by4eBE3cODwPhsuKkSnR5aVDcN+baoDg6oBeYby50wEIi7FiDnSFsZHBjC1zHO71gk5cfEPY4Y542RUyDMVGRs2oJqNAkq/+daSpf6PXlZQWZITgtdoOQsj4czUCrsiIRMjMcErXCikvEFP/Th6MaOA22lE6Sq522dvLMY3rCLy/uwTmvwjQVuFwV61Zh3GbBGfLs8g8KsMetwrTq6tK61p5ia3CFcLJ1G/ZL1vUURUeeudFAvjAoZkigfOfY+hsWQJGm8z9sBqLgk7ELR/Ishyjk3fF7KKIsHd84irIzkCc/MAQnWzd3fISNnAkKWUNwrqJSGFfxs5GoMTZKei+CV+luiHU2I1FV+ALFoQgOvqbWOdbAWYnSqACG04lK7/AVPqgL3ICok/2oJ3xvhdU5eYcfJeFiRBTAHre40NMRl64MNPQBiMrpKFdaYyC13nPsJ2oKJfu2YNtFdX0YU1f+hoNLOm5JXWMZdCGMK1EtNhyOT+OJChTroVE4WxRRYLYl/5idKDh1sB+5SeMNRO0mE2Ux5gRaSN0M504hysOYk7DGvCdqCR0XgO0YFCvjTjKtZIiodCJa0JJBjTpk1P6LoRKZX2qnofClEkh8VUFu3Z7pdESdYe9hd0GxbYTWwRlFJRRpFO3riJuogWI9Cmej9nRJm10hUZvtsMP5+qCYHjYrUSai4pUo/6B4HFF4wLcHxRDOWdQwRBGFqLEjNCKqpA4Wsj9CW3ex6Yx5ZIRrRaVbYD63zMWYDzz5eD9KEg+N+XaCH6Ws5obwo4Bo+dZCq+YtKbT2OpOnhsLXVo5bXzJ3Jl1HdRdVQ5S7TQkeFI8k6h0hjIGomWK9laiVKExU35gTL2OuEjVszMmAMY8kUR7GfFhUf2NuxK6Mebe6CtZn4bLpQKX+ESJqG6UaOFfsxFLxhEsVolzgBrAj8BZc/CiiEE+3GyCNtx+FguL+CO0bFCMdQWHo1ikoHvKj5NdJ30y4xXqQqENHFIEWzYb9qhAGE2WyaDbs1xC1qFhvdqLilahZNAoHxdaHcRb1NUS5GnN1FIWR5whjDuECG3M0zjgacx12SxTaOa7ZRm7Zjh0hjYoy2650ZsNGm9wH4OyiRmBio3IPDHBWUSXcuEwGes+8XuoYtmiDB5ysncls0cYHxe4JHXpWZ3wI0xH1vwxhVqJWol5JVKz5hj9RtrNYQ/tNbQkiPET1tlGD2H62XzPqIaKsQ4kV23XUs8MpRGX6k2JW7HbUa9/CaD8KjsHL8qOWHBSvIcxKVECiamlWogBRptmDTfkPEKUZoZ0ykqHlWLBSDFu3RSidMa8r7AdbfxbG+Zz4QFBcf81V1JYo82Sx0yR3hDRKO2fuCqeZQHed19Zi9+fMp8BposF4rGfeLKkPdtSQGcnsok4LikNnJPtn1vVWolai3kaUb1A8kahoAlGjg+LwGgUr8BBSsG0/utwE2QS4YBoFscMExUvbcYe3Ji4oKF6aZz77ruCVqKlErdunHYPif4Eox0hTExRriQoTFJNpQXGpzB5MSxAx9QgTImoqWtCSIY3KJqLZokFr7mtM1FBHjVXsaUFxH04VFU3n2/TPii36a5gQZmEnQA1ELSDWWxhR5aKIOiyXqP1K1BxEOYZbxuhNJWowMgyYScMh6YeGKGNk6BhoDl17QAaJx+f1mN2L08ChrYkS2/W8HoE6grEpzDI5xuFEcFqifDxzB6IcHU5Xz9zZ4UQa1SNKu9N7wOEcQZRRozbOccE7QhiGjvPPHhSj7LfxkogisxMVm4jKF0UUzL4XjijXjo+eLDZq1OiguCNqelBsJkob8JhEbYmauFibfiCNeu3arx82Q0SlE+Fs0aBVR2BapDbR1s9LHcT2DoqH4VRREygZyPbjencVUuew+aN4vCTPnBmImimE+VwsUSjH3fyJtmCOO35bElEFJGr+1G0wDye/LIkomD58SjLAQEExynb5XFJ6ybN/ekmErQTFE7d6o7Sgm5La4Py2ervetKETFe0F5E86cZN7ZNZ+J8+cXXFKXqz9Uv8s2BRiBwuK0RvkF0aUbWe+qzDy68SDKNSVC3zBAYNwsnUb9ktCmARf5QG9/lmCYiWGkXm6F0AUujEjP9E5iEJPhvN0b/h3tgiiPrFUFxaKKB8bpYyiyvUGH8x9NgyN0HiG0xi4uqTppso9HuWIHXIqURNGPfkJVqlNvr/Ij4gj3KhRz4ydZlf87iqFQj8aN+r5ztgL4oGvk8XlBhe+vQsI2ZKEq6lTM8NI7W9olW9O/AhVMlhJf+A6bHhULL1s1ZuPyoFdbM6LC7rOJL9h7spIQxUrVSsVz7eH+trd7+/vx+NxPp+Px7/H4/1y+Yo12Gnx936//73U5X6vvns8nu/HplQ/fT6fZ1Eeojyby30/6/J9+pR/d7f8nsrenUyVhdJse/TdmuhKlLkrE6beyVRzpd5CJe+V2n8m4jUBuMueDxT1hqrccrdvX5QTW8bdVTGJTdfr7fv3ovFdqhB1D3B36H4vmtN+VmDzPCNRtXvufFMcf2KiihffscqvLAhRAYx59QsfrchZBDOSafptyMLvLHbJNmUNijWTxSOSgvn0H/5MfhCSr9cqFD9GiqjOc+b4ySONwmSaVNoJrHQaCvSvN/SZSmW3ALZuIAjJ010j6ixpun/2B1ydb6esekOH/VILleeXVCPqPEFx1zpzvvo6P3RzlvT5MoXaVwNswTwdxLBEmZLisHvf2dMWfpW+duVYvIqnDd8cmXcao8lEuTmwLD7XVFkfPj+1QYmzZfMsOd8/YzYgqoGoflDskKZbZ8yJml5SSQDNssuh8ZyHDVbeBlXhLzgWvvvuktBhUb2NudmPcltcUGll5Ot42h3KsrIRjdBtAAKfhh9F8lSC/9evtPf6iuhmk+/3ZVluD4fd6XxjzEHUvh8VPCjud1Tg7tZTJVFW+SFJc/vurYibv2CHzA9iIu2M5rWP17o0sfHl+nWrS/M/15u4x/erKTch+E38J2P1bvlY0tEsAmSU/sg9LKqrTSGBQpiB1hlrseGSsrxBEU/QlAJOTmVJgZpKu/OwqbTTfKyuoo2ME0U10RAw1nNqHd+B+V3PTeGFkrMJ2zfH3S8niqH7jPOC4Jwg9cYFABdi+3RYoszG3C1Nt3OkSY9YfyqrD+cc2ntWA9650Ik6KihWJ2MDHGNyLNi53CYZtlrXRV181SsReAuG5X9zUNx7qcPOySMHVPFbinyoMkOBa4C7q6b6UWEPX/s4EwU250pXlNgBdwVPEBVgz0CUcj09Kjz+HxI1OtJUIjvl6sng+8znIGrclThq69SsUH9GnoV5lahGogaMuccIbbOQD0Pfy8ssfHrJEaJmGuyWKBvx6KVqcrMMHXBiCjbeTAUV6knHXLs9KCqC8xOV9rHJ5DTdfmbCYM7zmx5uXAgTRtQ3B8UYmx21KpXvmPowywth3koUKbSzn2Lj4EoUwGbfur5XxircUolCh0DG7bcyHjBBua+15pw/2Q+2V4KIV4qqYsPl0EwuqGb9ilg2ZeJrCQOrqymDC6pMA4cqPXO+3/ACLtba4BxFla2ihWBPURFc1L6Ft/hRVembc3FOJbgfFfg0QEsUcdRQRzNBoPYj7L4551cN3G8NYcK1zj7Vvle+6kzx7yaKqNtX+FO3P2AliqiLnnmR2OCWRJTGpI2JNB2WS5Vl9PzEkPWd1Zjb765K4A7sgbsszAec3K/GSNEucH4bOC+lw/a7FMRVVOuTT07TPWKaD3oI9eKL7WDj2DTdAUSN5gphGmx4zr6esXtVWqQAos5LVPToVKq+nGglyogd51308vV/IGp0pKlvHUSaf8TOvJw/etg2G/VuUZW7q4SFbyvNkavqNQlz31TkwZ6sV8kyUUlBRQ4lChwDcMVHvaupvEc97NQMRyCco6hpX9R2oHMUtcVu34JbaGjzo1ydk7QRRiJYd7GNS9M9QtQlBcWWAX8NYVaiRrX+loxksxMVYPP27yXK0dPHT1bXhvMaN63bsDtjDuAC3F1lERXDmUVtiZIT0aKgSmL+aEwlMNy7RZ2cptuvo77q7qrx6uyof/OEMA6d6VeFMCtRK1ErUStRcxP1H4Duwcty1Hr1AAAAAElFTkSuQmCC" alt=""/>

                            <p>Comment</p>
                        </a>
                    </div>

                    <div className="share">
                        <a href="/#">
                            <img src="http://download.seaicons.com/icons/icons8/windows-8/512/Arrows-Redo-icon.png" alt="" />
                            <p>
                                Share
                            </p>
                        </a>
                    </div>

                </div>

            </div>
        </>

    )
}