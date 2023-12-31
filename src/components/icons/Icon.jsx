// PRODUCT RELATED ICONS
import dry from '../../assets/product-icons/iconos_producto_sueltos_Sin agua.svg'
import al1 from '../../assets/product-icons/iconos_producto_sueltos_AL1.svg'
import al2 from '../../assets/product-icons/iconos_producto_sueltos_AL2.svg'
import angle_grinder from '../../assets/product-icons/iconos_producto_sueltos_Amoladora.svg'
import bc from '../../assets/product-icons/iconos_producto_sueltos_Banda Contunua.svg'
import blz from '../../assets/product-icons/iconos_producto_sueltos_BLZ.svg'
import wet from '../../assets/product-icons/iconos_producto_sueltos_Con agua.svg'
import laser from '../../assets/product-icons/iconos_producto_sueltos_Icono Laser _Ing.svg'
import floor_saw from '../../assets/product-icons/iconos_producto_sueltos_Juntas copia.svg'
import lacc from '../../assets/product-icons/iconos_producto_sueltos_Lacc.svg'
import lar from '../../assets/product-icons/iconos_producto_sueltos_LAR.svg'
import cut_off_small from '../../assets/product-icons/iconos_producto_sueltos_Lijadora de mano.svg'
import cut_off from '../../assets/product-icons/iconos_producto_sueltos_Lijadora.svg'
import drilling_machine from '../../assets/product-icons/iconos_producto_sueltos_Maquina brocas.svg'
import drilling_machine_high_power from '../../assets/product-icons/iconos_producto_sueltos_PIes.svg'
import table_saw from '../../assets/product-icons/iconos_producto_sueltos_MAquina de mesa.svg'
import turbo_laser from '../../assets/product-icons/iconos_producto_sueltos_Turbo Laser.svg'
import turbo from '../../assets/product-icons/iconos_producto_sueltos_Turbo.svg'
import broca from '../../assets/product-icons/iconos_producto_sueltos_broca entera 1.svg'
import wire from '../../assets/product-icons/iconos_producto_sueltos_hilo 1.svg'
import precast from '../../assets/product-icons/iconos_producto_sueltos_prefabricados 3.svg'

import low_power from '../../assets/product-icons/iconos_producto_sueltos_Baja potencia.svg'
import medium_power from '../../assets/product-icons/iconos_producto_sueltos_Media potencia.svg'
import high_power from '../../assets/product-icons/iconos_producto_sueltos_Alta potencia.svg'

// HOME PAGE RELATED ICONS
import language from '../../assets/fa-icons/language.png'
import diamond from '../../assets/fa-icons/diamond.png'
import fast from '../../assets/fa-icons/fast.png'
import network from '../../assets/fa-icons/global-network.png'
import scientist from '../../assets/fa-icons/scientist.png'
import spain from '../../assets/fa-icons/spain.png'
import team from '../../assets/fa-icons/team.png'
import iso from '../../assets/fa-icons/iso.png'


const icons = {
    dry,
    al1,
    al2,
    'angle grinder': angle_grinder,
    "BC": bc,
    "BLZ": blz,
    wet,
    laser,
    'floor saw': floor_saw,
    lacc,
    "LAR": lar,
    "cut-off small": cut_off_small,
    "cut-off machine": cut_off,
    "drilling machine": drilling_machine,
    'table saw': table_saw,
    'turbo laser': turbo_laser,
    'TURBO': turbo,
    "low power": low_power,
    "medium power": medium_power,
    "high power": high_power,
    "broca": broca,
    "Broca": broca,
    "BROCA": broca,
    "WIRE": wire,
    "precast machine": precast,
    "drilling machine > 2.4kw": drilling_machine_high_power,
    "drilling machine < 2.4kw": drilling_machine,

    language,
    diamond,
    fast,
    network,
    scientist, 
    spain,
    team,
    iso
}

export default function Icon({ i }) {

    if (!i) return

    const iArray = i.split(', ')

    return (
        <div className='icon-img-container'>
            {
                iArray.map((iconName, index) => (<img key={index} src={icons[iconName]} alt={iconName} />)) 

            }
        </div>
    )
    
 }

export { icons }