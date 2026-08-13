package com.alert.user;

import com.alert.user.entity.District;
import com.alert.user.repository.DistrictRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DistrictRepository districtRepository;

    public DataInitializer(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (districtRepository.count() < 38) {
            System.out.println("Initializing Districts Reference Data...");
            districtRepository.deleteAll();
            List<District> districts = Arrays.asList(
                    createDistrict("Ariyalur", "[\"Ariyalur\", \"Sendurai\", \"Udayarpalayam\", \"Andimadam\"]"),
                    createDistrict("Chengalpattu", "[\"Chengalpattu\", \"Tambaram\", \"Pallavaram\", \"Vandalur\", \"Thiruporur\", \"Tirukalukundram\", \"Madurantakam\", \"Cheyyur\"]"),
                    createDistrict("Chennai", "[\"Alandur\", \"Ambattur\", \"Aminjikarai\", \"Ayanavaram\", \"Egmore\", \"Guindy\", \"Madhavaram\", \"Madhuravoyal\", \"Mambalam\", \"Mylapore\", \"Perambur\", \"Purasawalkam\", \"Sholinganallur\", \"Thiruvottiyur\", \"Tondiarpet\", \"Velachery\"]"),
                    createDistrict("Coimbatore", "[\"Coimbatore North\", \"Coimbatore South\", \"Mettupalayam\", \"Pollachi\", \"Valparai\", \"Kinathukadavu\", \"Annur\", \"Perur\", \"Madukkarai\", \"Sulur\", \"Anaimalai\"]"),
                    createDistrict("Cuddalore", "[\"Cuddalore\", \"Chidambaram\", \"Kattumannarkoil\", \"Panruti\", \"Kurinjipadi\", \"Bhuvanagiri\", \"Titakudi\", \"Veppur\", \"Srimushnam\"]"),
                    createDistrict("Dharmapuri", "[\"Dharmapuri\", \"Harur\", \"Palacode\", \"Pappireddipatti\", \"Pennagaram\", \"Nallampalli\", \"Karimangalam\"]"),
                    createDistrict("Dindigul", "[\"Dindigul East\", \"Dindigul West\", \"Palani\", \"Oddanchatram\", \"Vedasandur\", \"Natham\", \"Nilakkottai\", \"Kodaikanal\", \"Attur\"]"),
                    createDistrict("Erode", "[\"Erode\", \"Bhavani\", \"Gobichettipalayam\", \"Sathyamangalam\", \"Perundurai\", \"Anthiyur\", \"Modakurichi\", \"Kodumudi\", \"Thalavadi\", \"Nambiyur\"]"),
                    createDistrict("Kallakurichi", "[\"Kallakurichi\", \"Sankarapuram\", \"Chinnasalem\", \"Ulundurpet\", \"Tirukkoyilur\", \"Kalvarayan Hills\"]"),
                    createDistrict("Kancheepuram", "[\"Kancheepuram\", \"Sriperumbudur\", \"Uthiramerur\", \"Walajabad\", \"Kundrathur\"]"),
                    createDistrict("Kanniyakumari", "[\"Agastheeswaram\", \"Thovalai\", \"Kalkulam\", \"Vilavancode\", \"Killiyur\", \"Thiruvattar\"]"),
                    createDistrict("Karur", "[\"Karur\", \"Aravakurichi\", \"Manmangalam\", \"Pugalur\", \"Kulithalai\", \"Krishnarayapuram\", \"Kadavur\"]"),
                    createDistrict("Krishnagiri", "[\"Krishnagiri\", \"Hosur\", \"Pochampalli\", \"Uthangarai\", \"Denkanikottai\", \"Bargur\", \"Sulagiri\", \"Anjetty\"]"),
                    createDistrict("Madurai", "[\"Madurai North\", \"Madurai South\", \"Madurai East\", \"Madurai West\", \"Thiruparankundram\", \"Melur\", \"Usilampatti\", \"Thirumangalam\", \"Peraiyur\", \"Vadipatti\"]"),
                    createDistrict("Mayiladuthurai", "[\"Mayiladuthurai\", \"Sirkazhi\", \"Tharangambadi\", \"Kuthalam\"]"),
                    createDistrict("Nagapattinam", "[\"Nagapattinam\", \"Kilvelur\", \"Thirukuvalai\", \"Vedaranyam\"]"),
                    createDistrict("Namakkal", "[\"Namakkal\", \"Rasipuram\", \"Tiruchengode\", \"Paramathi Velur\", \"Kolli Hills\", \"Sendamangalam\", \"Komarapalayam\", \"Mohanur\"]"),
                    createDistrict("Nilgiris", "[\"Udhagamandalam\", \"Coonoor\", \"Kotagiri\", \"Kundah\", \"Gudalur\", \"Pandalur\"]"),
                    createDistrict("Perambalur", "[\"Perambalur\", \"Kunnam\", \"Alathur\", \"Veppanthattai\"]"),
                    createDistrict("Pudukkottai", "[\"Pudukkottai\", \"Alangudi\", \"Aranthangi\", \"Avadaiyarkoil\", \"Gandarvakottai\", \"Iluppur\", \"Karambakkudi\", \"Kulathur\", \"Manamelkudi\", \"Ponnamaravathi\", \"Thirumayam\", \"Viralimalai\"]"),
                    createDistrict("Ramanathapuram", "[\"Ramanathapuram\", \"Rameswaram\", \"Tiruvadanai\", \"Paramakudi\", \"Kamuthi\", \"Mudukulathur\", \"Kadaladi\", \"Kilakarai\", \"R.S. Mangalam\"]"),
                    createDistrict("Ranipet", "[\"Ranipet\", \"Arakkonam\", \"Arcot\", \"Walajah\", \"Nemili\", \"Sholingur\"]"),
                    createDistrict("Salem", "[\"Salem\", \"Attur\", \"Edappadi\", \"Gangavalli\", \"Kadaiyampatti\", \"Mettur\", \"Omalur\", \"Pethanaickenpalayam\", \"Salem South\", \"Salem West\", \"Sankari\", \"Vazhapadi\", \"Yercaud\"]"),
                    createDistrict("Sivaganga", "[\"Sivaganga\", \"Karaikudi\", \"Devakottai\", \"Manamadurai\", \"Ilayangudi\", \"Tirupuvanam\", \"Tirupathur\", \"Singampunari\", \"Kalaiyarkoil\"]"),
                    createDistrict("Tenkasi", "[\"Tenkasi\", \"Ambasamudram\", \"Kadayanallur\", \"Sankarankoil\", \"Shencottai\", \"Sivagiri\", \"Thiruvengadam\", \"V.K.Pudur\"]"),
                    createDistrict("Thanjavur", "[\"Thanjavur\", \"Kumbakonam\", \"Papanasam\", \"Pattukkottai\", \"Peravurani\", \"Orathanadu\", \"Thiruvidaimarudur\", \"Thiruvaiyaru\", \"Budalur\"]"),
                    createDistrict("Theni", "[\"Theni\", \"Periyakulam\", \"Andipatti\", \"Uthamapalayam\", \"Bodinayakanur\"]"),
                    createDistrict("Thoothukudi", "[\"Thoothukudi\", \"Tiruchendur\", \"Sathankulam\", \"Thiruvaikuntam\", \"Ottapidaram\", \"Kovilpatti\", \"Ettayapuram\", \"Vilathikulam\", \"Kayathar\", \"Eral\"]"),
                    createDistrict("Tiruchirappalli", "[\"Tiruchirappalli West\", \"Tiruchirappalli East\", \"Manapparai\", \"Srirangam\", \"Thiruverumbur\", \"Lalgudi\", \"Musiri\", \"Thuraiyur\", \"Marungapuri\"]"),
                    createDistrict("Tirunelveli", "[\"Tirunelveli\", \"Palayamkottai\", \"Manur\", \"Ambasamudram\", \"Cheranmahadevi\", \"Nanguneri\", \"Radhapuram\", \"Thisayanvilai\"]"),
                    createDistrict("Tirupathur", "[\"Tirupathur\", \"Vaniyambadi\", \"Ambur\", \"Natrampalli\"]"),
                    createDistrict("Tiruppur", "[\"Tiruppur North\", \"Tiruppur South\", \"Avinashi\", \"Palladam\", \"Kangeyam\", \"Dharapuram\", \"Udumalaipettai\", \"Madathukulam\", \"Uthukuli\"]"),
                    createDistrict("Tiruvallur", "[\"Tiruvallur\", \"Poonamallee\", \"Ponneri\", \"Gummidipoondi\", \"Uthukkottai\", \"Tiruttani\", \"Pallipattu\", \"R.K. Pettai\", \"Avadi\"]"),
                    createDistrict("Tiruvannamalai", "[\"Tiruvannamalai\", \"Kilpennathur\", \"Chengam\", \"Thandarampet\", \"Polur\", \"Kalasapakkam\", \"Arani\", \"Chetpet\", \"Vandavasi\", \"Cheyyar\", \"Vembakkam\", \"Jamunamarathur\"]"),
                    createDistrict("Tiruvarur", "[\"Tiruvarur\", \"Mannargudi\", \"Thiruthuraipoondi\", \"Nannilam\", \"Kudavasal\", \"Valangaiman\", \"Needamangalam\", \"Koothanallur\"]"),
                    createDistrict("Vellore", "[\"Vellore\", \"Anaicut\", \"Katpadi\", \"K.V. Kuppam\", \"Gudiyatham\", \"Pernambut\"]"),
                    createDistrict("Viluppuram", "[\"Viluppuram\", \"Tindivanam\", \"Vanur\", \"Vikravandi\", \"Marakkanam\", \"Kandachipuram\", \"Gingee\", \"Melmalaiyanur\", \"Thiruvennainallur\"]"),
                    createDistrict("Virudhunagar", "[\"Virudhunagar\", \"Aruppukkottai\", \"Sattur\", \"Sivakasi\", \"Srivilliputhur\", \"Rajapalayam\", \"Tiruchuli\", \"Kariapatti\", \"Vembakottai\", \"Watrap\"]")
            );
            districtRepository.saveAll(districts);
            System.out.println("Initialized " + districts.size() + " districts.");
        }
    }

    private District createDistrict(String name, String taluksJson) {
        District d = new District();
        d.setName(name);
        d.setTaluksJson(taluksJson);
        return d;
    }
}
