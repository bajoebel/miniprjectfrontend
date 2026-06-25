<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";

import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Avatar from "primevue/avatar";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import { getRegistrationById } from "../../services/registrationService";
import { getRME, saveRME } from "../../services/rmeService";

const route = useRoute();
const toast = useToast();

/* =======================
   STATE
======================= */
const loading = ref(false);

const infoRegistration = ref({
  patient_id: null,
  clinic_id: null,
  doctor_id: null,
  service_type_id: null,
  insurance_id: null,
  registration_date: null,
  complaint: null,
});

const rme = ref({
  anamnesis: {
    complaint: "",
    history_disease: "",
    allergy: "",
  },

  examination: {
    systolic: null,
    diastolic: null,
    temperature: null,
    pulse: null,
    respiration: null,
  },

  diagnosis: {
    diagnosis: "",
  },

  prescriptions: [],
  procedures: [],
});

/* =======================
   LOAD REGISTRATION
======================= */
const loadRegistration = async () => {
  const res = await getRegistrationById(route.query.id);
  infoRegistration.value = res.data.response;
};

/* =======================
   LOAD RME
======================= */
const loadRME = async () => {
  const res = await getRME(route.query.id);

  if (res.data.response) {
    rme.value = res.data.response;
  }
};

/* =======================
   SAVE RME
======================= */
const saveRMEData = async () => {
  try {
    loading.value = true;

    await saveRME({
      registration_id: route.params.id,
      ...rme.value,
    });

    toast.add({
      severity: "success",
      summary: "Berhasil",
      detail: "RME berhasil disimpan",
      life: 3000,
    });
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Gagal",
      detail: err.response?.data?.metadata?.message || err.message,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

/* =======================
   INIT
======================= */
// console.log("FULL ROUTE:", route);
// console.log("QUERY:", route.query);
// console.log("ID:", route.query?.id);
onMounted(async () => {
    console.log("FULL ROUTE:", route);
    console.log("QUERY:", route.query);
    console.log("ID:", route.query?.id);
//   if (route.query.id) {
//     // alert("loadRegistrasi")
//     await loadRegistration();
//     // await loadRME();
//   }
});

/* =======================
   HELPER
======================= */
const getInitial = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
</script>

<template>
  <div class="grid">

    <!-- =======================
         PATIENT INFO
    ======================= -->
    <div class="col-12">
      <Card>
        <template #title>
          <div class="flex align-items-center gap-3">
            <Avatar
              :label="getInitial(infoRegistration.patient_id?.name)"
              shape="circle"
              size="large"
            />

            <div>
              <div class="text-lg font-bold">
                {{ infoRegistration.patient_id?.name || "-" }}
              </div>
              <div class="text-sm text-500">
                {{ infoRegistration.patient_id?.medical_record_number || "-" }}
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- =======================
         REGISTRATION INFO
    ======================= -->
    <div class="col-3">
      <Card>
        <template #title>Informasi Kunjungan</template>

        <template #content>
          <div class="mb-3">
            <div class="text-500 text-sm">Tanggal</div>
            <div class="font-medium">
              {{
                infoRegistration.registration_date
                  ? new Date(infoRegistration.registration_date).toLocaleString()
                  : "-"
              }}
            </div>
          </div>

          <div class="mb-3">
            <div class="text-500 text-sm">Poliklinik</div>
            <div class="font-medium">
              {{ infoRegistration.clinic_id?.name || "-" }}
            </div>
          </div>

          <div class="mb-3">
            <div class="text-500 text-sm">Dokter</div>
            <div class="font-medium">
              {{ infoRegistration.doctor_id?.name || "-" }}
            </div>
          </div>

          <div class="mb-3">
            <div class="text-500 text-sm">Keluhan Awal</div>
            <div class="font-medium">
              {{ infoRegistration.complaint || "-" }}
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- =======================
         RME FORM
    ======================= -->
    <div class="col-9">
      <Card>
        <template #title>Rekam Medis Elektronik</template>

        <template #content>

          <TabView>

            <!-- ANAMNESIS -->
            <TabPanel header="Anamnesis">
              <div class="grid">

                <div class="col-12 mb-3">
                  <label>Keluhan</label>
                  <Textarea v-model="rme.anamnesis.complaint" class="w-full" />
                </div>

                <div class="col-12 mb-3">
                  <label>Riwayat Penyakit</label>
                  <Textarea v-model="rme.anamnesis.history_disease" class="w-full" />
                </div>

                <div class="col-12 mb-3">
                  <label>Alergi</label>
                  <Textarea v-model="rme.anamnesis.allergy" class="w-full" />
                </div>

              </div>
            </TabPanel>

            <!-- PEMERIKSAAN -->
            <TabPanel header="Pemeriksaan">
              <div class="grid">

                <div class="col-6 mb-3">
                  <label>Sistolik</label>
                  <InputText v-model="rme.examination.systolic" class="w-full" />
                </div>

                <div class="col-6 mb-3">
                  <label>Diastolik</label>
                  <InputText v-model="rme.examination.diastolic" class="w-full" />
                </div>

                <div class="col-4 mb-3">
                  <label>Suhu</label>
                  <InputText v-model="rme.examination.temperature" class="w-full" />
                </div>

                <div class="col-4 mb-3">
                  <label>Nadi</label>
                  <InputText v-model="rme.examination.pulse" class="w-full" />
                </div>

                <div class="col-4 mb-3">
                  <label>Respirasi</label>
                  <InputText v-model="rme.examination.respiration" class="w-full" />
                </div>

              </div>
            </TabPanel>

            <!-- DIAGNOSIS -->
            <TabPanel header="Diagnosis">
              <Textarea v-model="rme.diagnosis.diagnosis" class="w-full" />
            </TabPanel>

            <!-- RESEP -->
            <TabPanel header="Resep">
              <div class="text-500 text-sm">
                (akan dikembangkan dynamic table obat)
              </div>
            </TabPanel>

            <!-- TINDAKAN -->
            <TabPanel header="Tindakan">
              <div class="text-500 text-sm">
                (akan dikembangkan tariff tindakan)
              </div>
            </TabPanel>

          </TabView>

          <div class="mt-4 flex justify-content-end">
            <Button
              label="Simpan RME"
              icon="pi pi-save"
              :loading="loading"
              @click="saveRMEData"
            />
          </div>

        </template>
      </Card>
    </div>

  </div>
</template>