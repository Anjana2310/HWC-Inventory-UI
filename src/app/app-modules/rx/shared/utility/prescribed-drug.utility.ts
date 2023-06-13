import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

export class PrescribedDrugsUtils {

  constructor(private fb: FormBuilder) { }

  initBatchListElement(batch, selection): FormGroup {
    return this.fb.group({
      expiryDate: batch.expiryDate,
      batchNo: batch.batchNo,
      quantity: batch.quantity,
      quantityInHand: batch.qty || batch.quantityInHand,
      expiresIn: batch.expiresIn,
      selection: batch.selection && selection == '1' ? true : false,
      itemStockEntryID: batch.itemStockEntryID
    })
  }

  initBatchListArray(batchList, selection): FormArray {
    const batches: FormArray = this.fb.array([]);
    batchList.forEach(element => {
      batches.push(this.initBatchListElement(element, selection));
    });
    return batches;
  }

  initPrescribedDrugs(drug, selection): FormGroup {
    return this.fb.group({
      duration: drug.duration,
      durationUnit: drug.durationUnit,
      durationView: `${drug.duration} ${drug.durationUnit}`,
      dose: drug.dose,
      route: drug.route,
      genericDrugName: drug.genericDrugName,
      drugStrength: drug.drugStrength,
      specialInstruction: drug.specialInstruction,
      qtyDispensed: null,
      qtyPrescribed: drug.qtyPrescribed,
      drugID: drug.drugID,
      drugForm: drug.drugForm,
      frequency: drug.frequency,
      batchList: this.fb.array([]),
      selectionBatchList: this.fb.array([]),
      preDefinedBatchList: this.initBatchListArray(drug.batchList, selection)
    })
  }

  initPrescribedDrugsArray(itemList, selection): FormArray {
    const drugArray: FormArray = this.fb.array([]);
   if(typeof(itemList) === 'object') {
    itemList.forEach((element) => {
      drugArray.push(this.initPrescribedDrugs(element, selection));
    })
  }
    return drugArray;
  }

  initPrescriptionForm(prescription, selection): FormGroup {
    return this.fb.group({
      consultantName: prescription.consultantName,
      prescriptionID: prescription.prescriptionID,
      beneficiaryRegID: prescription.beneficiaryRegID,
      visitCode: prescription.visitCode,
      itemList: this.initPrescribedDrugsArray(prescription.itemList, selection)
    })
  }

}
