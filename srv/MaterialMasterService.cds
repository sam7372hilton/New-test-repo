using {material.db as Master} from '../db/data-model';

service MaterialSrv @(path: 'MaterialSrv') {
    entity MaterialMaster    as projection on Master.MaterialMaster;

    action createMaterial(MaterialNumber : String(60),
                          Description : String(60),
                          IndustrySector : String(60),
                          MaterialType : String(60),
                          Plant : String(60),
                          StorageLocation : String(60),
                          UOM : String(60),
                          MaterialGroup : String(60)) returns String;

    entity IndustrySectorF4  as projection on Master.IndustrySectorF4;
    entity PlantF4           as projection on Master.PlantF4;
    entity StorageLocationF4 as projection on Master.StorageLocationF4;
    entity MaterialGroupF4   as projection on Master.MaterialGroupF4;
    entity AuthUser          as projection on Master.AuthUser;

}
