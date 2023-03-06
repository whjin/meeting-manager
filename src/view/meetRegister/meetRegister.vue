<template>
  <i-content class="main-content-con manage">
    <i-layout class="main-layout-con">
      <i-content class="content-wrapper">
        <i-tabs style="height: calc(100% - 100px);" @on-click="changeTabs">
          <i-tab-pane label="会见审核" name="manage" style="position:relative;">
            <div class="searchTitleInput">
              <span class="searchItemText">姓名:</span>
              <input class="searchItemInput" type="text" v-model="searchCon.data.rybhName" placeholder="请输入姓名">
              <span class="searchItemText">档案编号:</span>
              <input class="searchItemInput" type="text" v-model="searchCon.data.dabh" placeholder="请输入档案编号">
              <span class="searchItemText">监室号:</span>
              <input class="searchItemInput" type="text" v-model="searchCon.data.jsh" placeholder="请输入监室号">
              <span class="searchItemText">律师姓名:</span>
              <input class="searchItemInput" type="text" v-model="searchCon.data.lawyerName" placeholder="请输入律师姓名">
              <br />
              <span class="searchItemText">入所时间:</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setEntryDateStart" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <span class="searchItemText">至</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setEntryDateEnd" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <span class="searchItemText">预约时间:</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setGrantDateStart" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <span class="searchItemText">至</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setGrantDateEnd" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <i-button ghost @click="searchByCon" class="searchButton" style="margin-left: 10px;">查询</i-button>
            </div>
            <i-table border ref="table" :columns="columns" :data="data" style="height:calc(100% - 12vw);margin:0 10px;">

            </i-table>
            <div class="tablePage">
              <i-page style="text-align: right" :current="searchCon.pageParam.pageIndex" :total="total" :page-size="searchCon.pageParam.pageSize" :page-size-opts="pageSizeOpts" show-total @on-change="changePageIndex" @on-page-size-change="changePageSize" show-elevator show-sizer>
              </i-page>
            </div>
            <i-modal v-model="auditModal" width="1300px" @on-visible-change="closeModal">
              <p slot="header">
                <span class="title">会见{{ isAudit?'审核':'详情'}}</span>
              </p>
              <div class="auditInfo" style="height: 600px;overflow: auto">
                <i-form ref="auditModel" :model="auditModel" :label-width="155" label-position="right">
                  <div style="width: 100%;">
                    <div style="width: calc(100% - 170px);display: inline-block;">
                      <span style="font-size: 20px;color: #35FFFA;line-height: 24px;">在押人员信息</span>
                      <i-row style="margin-top: 10px">
                        <i-form-item label="姓名(必填):" prop="rybhName">
                          <i-input v-model="auditModel.rybhName" disabled></i-input>
                        </i-form-item>
                        <i-form-item label="监室号:" prop="jsh">
                          <i-input v-model="auditModel.jsh" disabled></i-input>
                        </i-form-item>
                        <i-form-item label="入所时间:" prop="rssj">
                          <i-input v-model="auditModel.rssj" disabled></i-input>
                        </i-form-item>
                      </i-row>
                      <i-row>
                        <i-form-item label="诉讼环节:" prop="ligition">
                          <i-input v-model="auditModel.ligition" disabled></i-input>
                        </i-form-item>
                        <i-form-item label="办案单位类型:" prop="organType">
                          <i-input v-model="auditModel.organType" disabled></i-input>
                        </i-form-item>
                        <i-form-item label="关押期限:" prop="gyqx">
                          <i-input v-model="auditModel.gyqx" disabled></i-input>
                        </i-form-item>
                      </i-row>
                      <i-row>
                        <i-form-item label="档案号:" prop="dabh">
                          <i-input v-model="auditModel.dabh" disabled></i-input>
                        </i-form-item>
                        <i-form-item label="户籍地详址:" prop="hjdxz">
                          <i-input v-model="auditModel.hjdxz" disabled id="hjdxz"></i-input>
                        </i-form-item>
                      </i-row>
                    </div>
                    <div style="width: 160px;height: 200px;float: right">
                      <img style="width: 125px;height: 164px;margin: 36px 0 0 15px;" :src="'data:image/png;base64,'+auditModel.headImg" v-show="auditModel.headImg">
                      <img style="width: 125px;height: 164px;margin: 36px 0 0 15px;" v-show="!auditModel.headImg">
                    </div>
                  </div>
                  <i-row style="margin-top: 10px">
                    <div style="font-size: 20px;color: #35FFFA;margin-bottom: 10px">律师预约信息</div>
                    <i-col span="8">
                      <i-form-item label="律师姓名:" prop="lawyerName">
                        <i-input v-model="auditModel.lawyerName" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="联系电话:" prop="iphone">
                        <i-input v-model="auditModel.iphone" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师证件号码:" prop="lawyerNumber">
                        <i-input v-model="auditModel.lawyerNumber" disabled></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="身份证号:" prop="idCard">
                        <i-input v-model="auditModel.idCard" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师执业机构:" prop="lawyerUnit">
                        <i-input v-model="auditModel.lawyerUnit" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="委托人姓名:" prop="clientName">
                        <i-input v-model="auditModel.clientName" disabled></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="登记时间:" prop="registerTime">
                        <i-input v-model="auditModel.registerTime" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="预约会见时间:" prop="appointmentDate">
                        <i-input v-model="auditModel.appointmentDate" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="预约会见时间段:" prop="appointmentTime">
                        <i-input v-model="auditModel.appointmentTime" disabled></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <span style="font-size: 20px;color: #35FFFA">现场办理信息</span>
                  <i-row style="margin-top: 10px">
                    <i-col span="16">
                      <i-form-item label="已委托律师:" prop="lawyerName">
                        <div style="width: 60px;display: block;float: left" v-for="(item, index) in lawyers" v-if="item.WTZT === '委托中'" :key="index">
                          <Button :size="small" type="info" value="item.index" @click="lawyerDetail(item.ID)">{{item.LSXM}}</Button>
                        </div>
                      </i-form-item>
                      <a style="position:relative;top:12px;text-decoration: underline">委托撤销详情</a>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="经办民警:" prop="operatorPolice">
                        <i-input v-model="auditModel.operatorPolice" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="登记时间:" prop="operationTime">
                        <i-input v-model="auditModel.operationTime" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="是否为法律援助:" prop="legalAidf">
                        <RadioGroup v-model="auditModel.legalAidf" type="button" @on-change="changeLegaAidf">
                          <Radio label="1" style="width: 60px;" :class="{selectColor: isLegaAidf}">
                            <span>是</span>
                          </Radio>
                          <Radio label="0" style="width: 60px;margin-left: 5px" :class="{selectColor: !isLegaAidf}">
                            <span>否</span>
                          </Radio>
                        </RadioGroup>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="16">
                      <i-form-item label="现场办理意见:" prop="approvalStatus">
                        <RadioGroup v-model="auditModel.approvalStatus" type="button" @on-change="changeApprovalStatus">
                          <Radio label="1" style="width: 100px;" :class="{selectColor:isApproval}">
                            <span>符合条件</span>
                          </Radio>
                          <Radio label="2" style="width: 100px;margin-left: 5px" :class="{selectColor:!isApproval&&!isCancel}">
                            <span>不予会见</span>
                          </Radio>
                          <Radio label="3" style="width: 100px;margin-left: 5px" :class="{selectColor:isCancel}">
                            <span>逾期取消</span>
                          </Radio>
                        </RadioGroup>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="委托至阶段:" prop="delegationStage">
                        <!-- <i-select v-model="auditModel.delegationStage">
                          <i-option v-for="(item, index) in lsfjList" :value="item.id" :key="index">{{ item.name }}</i-option>
                        </i-select>-->
                        <select-box :idx="0" :url="dicUrl" :submitClear="submitClear" :modify="phaseName" typeCode="SYS_DIC_COMMISSIONING_PHASE" @val="getPhaseVal" style="margin: 0!important;"></select-box>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="24">
                      <i-form-item label="备注说明:" prop="remarks" id="sfz">
                        <i-input v-model="auditModel.remarks"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="会见地点:" prop="meetingRoom">
                        <i-select v-model="auditModel.meetingRoom">
                          <i-option v-for="(item, index) in lsfjList" :value="item.value" :key="index">{{ item.name }}</i-option>
                        </i-select>
                      </i-form-item>
                      <a style="text-decoration: underline;position: absolute;width: fit-content;top: 12px;right: -34px;" @click="roomDetail">房间使用详情</a>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="其他人员:" prop="otherMembers">
                        <i-input v-model="auditModel.otherMembers" placeholder="两人请使用英文逗号分隔"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="人数:" prop="number">
                        <i-input v-model="auditModel.number"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="24">
                      <i-form-item label="身份证/护照号码2:" prop="idCard2" id="sfz">
                        <i-input v-model="auditModel.idCard2"></i-input>
                      </i-form-item>
                      <a style="margin-top:5px;position:relative;top:12px;margin-left:10px;text-decoration: underline" @click="personCheck(auditModel.idCard2)">人口库对比</a>
                      <a style="margin-top:5px;position:relative;top:12px;margin-left:10px;text-decoration: underline" @click="escapeCheck(auditModel.idCard2)">在逃对比</a>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="律师2姓名:" prop="lawyerName2">
                        <i-input v-model="auditModel.lawyerName2"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师2执业证件号码:" prop="lawyerNumber2">
                        <i-input v-model="auditModel.lawyerNumber2"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="联系方式2:" prop="iphone2">
                        <i-input v-model="auditModel.iphone2"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="律师2单位:" prop="lawyerUnit2" id="sfz">
                        <i-input v-model="auditModel.lawyerUnit2"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="律师助理姓名:" prop="assistantName">
                        <i-input v-model="auditModel.assistantName"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师助理执业证号码:" prop="assistantNumber">
                        <i-input v-model="auditModel.assistantNumber"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师事务所:" prop="assistantUnit">
                        <i-input v-model="auditModel.assistantUnit"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="4">
                      <span>身份证件照</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel.idCardUrl" @click="openCamera('idCardUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel.idCardUrl">
                          <img :src="auditModel.idCardUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel.idCardUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel.idCardUrl)">查看</i-button>
                      </a>
                    </i-col>
                    <i-col span="4">
                      <span>现场拍照</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel.headPortraitUrl" @click="openCamera1('headPortraitUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel.headPortraitUrl">
                          <img :src="auditModel.headPortraitUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel.headPortraitUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel.headPortraitUrl)">查看</i-button>

                      </a>
                    </i-col>
                    <i-col span="4">
                      <span>律师证件</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel.lawyerUrl" @click="openCamera('lawyerUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel.lawyerUrl">
                          <img :src="auditModel.lawyerUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel.lawyerUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel.lawyerUrl)">查看</i-button>

                      </a>
                    </i-col>
                    <i-col span="4">
                      <span>律师事务所证明</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel.certificationUrl" @click="openCamera('certificationUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel.certificationUrl">
                          <img :src="auditModel.certificationUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel.certificationUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel.certificationUrl)">查看</i-button>
                      </a>
                    </i-col>
                    <i-col span="4" style="margin-right: 0">
                      <span>委托扫描书</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel.attorneyUrl" @click="openCamera('attorneyUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel.attorneyUrl">
                          <img :src="auditModel.attorneyUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel.attorneyUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel.attorneyUrl)">查看</i-button>
                      </a>
                    </i-col>
                  </i-row>
                </i-form>
              </div>
              <div slot="footer" style="text-align: center" v-show="audit">
                <Button type="primary" @click="commitAuditModel">保存</Button>
                <Button type="primary" @click="auditModal = false">关闭</Button>
              </div>
            </i-modal>
            <i-modal v-model="addModal" width="1300px" @on-visible-change="closeAddModal">
              <p slot="header" style="color:#f60;">
                <span class="title">新增会见</span>
              </p>
              <div class="auditInfo" style="height: 600px;overflow: auto">
                <i-form ref="auditModel1" style="margin-top: 5px" :model="auditModel1" :label-width="155" label-position="right" :rules="addRule">
                  <div style="width: 100%;height: 210px">
                    <div style="width: 80%;float: left">
                      <span style="font-size: 20px;color: #35FFFA">在押人员信息</span>
                      <i-row style="margin-top: 10px">
                        <i-col span="8">
                          <i-form-item label="姓名(必填):" prop="rybhName">
                            <select-box :idx="1" :url="url" :submitClear="submitClear" v-show="isAdd" @val="getNameVal" style="margin: 0!important;"></select-box>
                            <i-input v-model="auditModel1.rybhName" v-show="!isAdd" disabled></i-input>
                          </i-form-item>
                        </i-col>
                        <i-col span="8">
                          <i-form-item label="监室号:" prop="jsh">
                            <i-input v-model="auditModel1.jsh" disabled></i-input>
                          </i-form-item>
                        </i-col>
                        <i-col span="8">
                          <i-form-item label="入所时间:" prop="rssj">
                            <i-input v-model="auditModel1.rssj" disabled></i-input>
                          </i-form-item>
                        </i-col>
                      </i-row>
                      <i-row>
                        <i-col span="8">
                          <i-form-item label="诉讼环节:" prop="ligition">
                            <i-input v-model="auditModel1.ligition" disabled></i-input>
                          </i-form-item>
                        </i-col>
                        <i-col span="8">
                          <i-form-item label="办案单位类型:" prop="organType">
                            <i-input v-model="auditModel1.organType" disabled></i-input>
                          </i-form-item>
                        </i-col>
                        <i-col span="8">
                          <i-form-item label="关押期限:" prop="gyqx">
                            <i-input v-model="auditModel1.gyqx" disabled></i-input>
                          </i-form-item>
                        </i-col>
                      </i-row>
                      <i-row>
                        <i-col span="8">
                          <i-form-item label="档案号:" prop="dabh">
                            <i-input v-model="auditModel1.dabh" disabled></i-input>
                          </i-form-item>
                        </i-col>
                        <i-col span="11">
                          <i-form-item label="户籍地详址:" prop="hjdxz">
                            <i-input v-model="auditModel1.hjdxz" disabled id="hjdxz"></i-input>
                          </i-form-item>
                        </i-col>
                      </i-row>
                    </div>
                    <div style="width: 15%;height: 200px;float: right">
                      <img style="width: 100px;height: 150px;margin: 30px 0 0 30px" :src="'data:image/png;base64,'+auditModel1.headImg" v-show="auditModel1.headImg">
                      <img style="width: 100px;height: 150px;margin: 30px 0 0 30px" v-show="!auditModel1.headImg">
                    </div>
                  </div>
                  <span style="font-size: 20px;color: #35FFFA">律师登记</span>
                  <i-row style="margin-top: 10px">
                    <i-col span="16">
                      <i-form-item label="已委托律师:">
                        <i-input></i-input>
                      </i-form-item>
                      <a style="margin-top:5px;position:relative;top:6px;margin-left:10px;text-decoration: underline">委托撤销详情</a>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="24">
                      <i-form-item label="身份证/护照号码:" prop="idCard" id="sfz">
                        <i-input v-model="auditModel1.idCard"></i-input>
                      </i-form-item>
                      <a style="margin-top:5px;position:relative;top:6px;margin-left:10px;text-decoration: underline">人口库对比</a>
                      <a style="margin-top:5px;position:relative;top:6px;margin-left:10px;text-decoration: underline">在逃对比</a>
                    </i-col>
                  </i-row>
                  <i-row style="margin-top: 10px">
                    <i-col span="8">
                      <i-form-item label="律师姓名:" prop="lawyerName">
                        <i-input v-model="auditModel1.lawyerName"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师证件号码:" prop="lawyerNumber">
                        <i-input v-model="auditModel1.lawyerNumber"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="联系方式(固话):" prop="telephone">
                        <i-input v-model="auditModel1.telephone"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="律师执业机构:" prop="lawyerUnit">
                        <i-input v-model="auditModel1.lawyerUnit"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="会见地点:" prop="meetingRoom">
                        <i-select v-model="auditModel1.meetingRoom">
                          <i-option v-for="(item, index) in lsfjList" :value="item.value" :key="index">{{ item.name }}</i-option>
                        </i-select>
                        <a style="text-decoration: underline;" @click="roomDetail">房间使用详情</a>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="联系方式(手机):" prop="iphone">
                        <i-input v-model="auditModel1.iphone"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="24">
                      <i-form-item label="身份证/护照号码2:" prop="idCard2" id="sfz">
                        <i-input v-model="auditModel1.idCard2"></i-input>
                      </i-form-item>
                      <a style="margin-top:5px;position:relative;top:6px;margin-left:10px;text-decoration: underline">人口库对比</a>
                      <a style="margin-top:5px;position:relative;top:6px;margin-left:10px;text-decoration: underline">在逃对比</a>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="律师姓名:" prop="lawyerName2">
                        <i-input v-model="auditModel1.lawyerName2"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师执业证件号码:" prop="lawyerNumber2">
                        <i-input v-model="auditModel1.lawyerNumber2"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="联系方式:" prop="iphone2">
                        <i-input v-model="auditModel1.iphone2"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="律师单位:" prop="lawyerUnit2">
                        <i-input v-model="auditModel1.lawyerUnit2"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="介绍信编号:" prop="introductoryNumber">
                        <i-input v-model="auditModel1.introductoryNumber"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="人数:" prop="number">
                        <i-input v-model="auditModel1.number"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="其他人员:" prop="otherMembers">
                        <i-input v-model="auditModel1.otherMembers" placeholder="两人请使用英文逗号分隔"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="律师助理姓名:" prop="assistantName">
                        <i-input v-model="auditModel1.assistantName"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师助理执业证号码:" prop="assistantNumber">
                        <i-input v-model="auditModel1.assistantNumber"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="律师事务所:" prop="assistantUnit">
                        <i-input v-model="auditModel1.assistantUnit"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="委托人姓名:" prop="clientName">
                        <i-input v-model="auditModel1.clientName"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="委托书类型:" prop="attorneyType">
                        <RadioGroup v-model="auditModel1.attorneyType" type="button" @on-change="changeAttorneyType">
                          <Radio label="1" style="width: 80px;" :class="{selectColor: isAttorney}">
                            <span>委托书</span>
                          </Radio>
                          <Radio label="2" style="width: 80px;margin-left: 5px" :class="{selectColor: !isAttorney}">
                            <span>授权托书</span>
                          </Radio>
                        </RadioGroup>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="是否为法律援助:" prop="legalAidf">
                        <RadioGroup v-model="auditModel1.legalAidf" type="button" @on-change="changeLegaAidf">
                          <Radio label="1" style="width: 60px;" :class="{selectColor: isLegaAidf}">
                            <span>是</span>
                          </Radio>
                          <Radio label="0" style="width: 60px;margin-left: 5px" :class="{selectColor: !isLegaAidf}">
                            <span>否</span>
                          </Radio>
                        </RadioGroup>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="委托至阶段:" prop="delegationStage">
                        <select-box :idx="2" :url="dicUrl" :submitClear="submitClear" :modify="phaseName" typeCode="SYS_DIC_COMMISSIONING_PHASE" @val="getPhaseVal" style="margin: 0!important;"></select-box>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="会见批准机关:" prop="approvalAuthority">
                        <i-input v-model="auditModel1.approvalAuthority"></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="许可决定文书号:" prop="decisionNo">
                        <i-input v-model="auditModel1.decisionNo"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="24">
                      <i-form-item label="会见说明:" prop="remarks" id="sfz">
                        <i-input v-model="auditModel1.remarks"></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="8">
                      <i-form-item label="经办民警:" prop="operatorPolice">
                        <i-input v-model="auditModel1.operatorPolice" disabled></i-input>
                      </i-form-item>
                    </i-col>
                    <i-col span="8">
                      <i-form-item label="登记时间:" prop="operationTime">
                        <i-input v-model="auditModel1.operationTime" disabled></i-input>
                      </i-form-item>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-col span="4">
                      <span>身份证件照</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel1.idCardUrl" @click="openCamera('idCardUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel1.idCardUrl">
                          <img :src="auditModel1.idCardUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel1.idCardUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel1.idCardUrl)">查看</i-button>
                      </a>
                    </i-col>
                    <i-col span="4">
                      <span>现场拍照</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel1.headPortraitUrl" @click="openCamera('headPortraitUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel1.headPortraitUrl">
                          <img :src="auditModel1.headPortraitUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel1.headPortraitUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel1.headPortraitUrl)">查看</i-button>
                      </a>
                    </i-col>
                    <i-col span="4">
                      <span>律师证件</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel1.lawyerUrl" @click="openCamera('lawyerUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel1.lawyerUrl">
                          <img :src="auditModel1.lawyerUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel1.lawyerUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel1.lawyerUrl)">查看</i-button>
                      </a>
                    </i-col>
                    <i-col span="4">
                      <span>律师事务所证明</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel1.certificationUrl" @click="openCamera('certificationUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel1.certificationUrl">
                          <img :src="auditModel1.certificationUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel1.certificationUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel1.certificationUrl)">查看</i-button>
                      </a>
                    </i-col>
                    <i-col span="4">
                      <span>委托扫描书</span>
                      <a class="upload-content">
                        <div class="cameraBox" v-show="!auditModel1.attorneyUrl" @click="openCamera('attorneyUrl')">
                          <i-icon type="ios-camera" size="20" style="margin-left: 4px"></i-icon>
                        </div>
                        <div class="cameraBox2" v-show="auditModel1.attorneyUrl">
                          <img :src="auditModel1.attorneyUrl" alt="" width="100" height="100" />
                        </div>
                        <i-button v-show="audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="auditModel1.attorneyUrl = ''">删除</i-button>
                        <i-button v-show="!audit" class="searchButton" type="primary" :size="small" style="display: inline-block;" @click="download(auditModel1.attorneyUrl)">查看</i-button>
                      </a>
                    </i-col>
                  </i-row>
                </i-form>
              </div>
              <div slot="footer" style="text-align: center" v-show="isAdd">
                <Button type="primary" @click="commitAuditModel1">保存</Button>
                <Button type="primary" @click="addModal = false">关闭</Button>
              </div>
            </i-modal>
            <i-modal v-model="cameraModal" width="1000px" @on-visible-change="closeCamera">
              <div style="height: 50px">
              </div>
              <div style="height: 550px">
                <div region="north" split="true" border="false" style="overflow: hidden; height: 500px;width:50%;float: left">
                  <img id="myCanvas" align="center" style="width: 100%;height: 100%;margin: 0!important;" />
                </div>
                <div style="width:50%;height: 500px;overflow: auto;border: 1px solid #027CFF;float: left;" id="camera">
                  <select id="resoultion" style="display: none;">
                    <option value="0">3664*2744</option>
                  </select>
                </div>
              </div>
              <div slot="footer" style="text-align: center;">
                <Button type="primary" @click="camera">拍照</Button>
                <Button type="primary" @click="upload(cameraUrl)">上传</Button>
              </div>
            </i-modal>
            <i-modal v-model="roomModal" width="900px">
              <p slot="header" style="color:#f60;">
                <span class="title">房间使用详情</span>
              </p>
              <div style="height: 300px">
                <div class="roomDetail" v-for="(item, index) in rooms" :key="index">
                  <div style="width: 100%;height: 100%" :class="{roomUsedColor:item.status ===3,roomNoUsedColor:item.status ===1}">
                    <span style="left: 15px;position: relative;top: 25px">{{item.roomName}}</span>
                  </div>
                </div>
              </div>
              <div slot="footer" style="text-align: center">
                <Button type="primary" @click="roomModal = false">关闭</Button>
              </div>
            </i-modal>
            <i-modal v-model="personModal" width="550px">
              <p slot="header" style="color:#f60;">
                <span class="title">公安部人口库信息</span>
              </p>
              <div style="height: 400px" class="personModel">
                <div style="height: 100%;width:300px;display:block;float: left">
                  <i-form ref="personModel" :model="personModel" :label-width="100" label-position="left">
                    <i-row>
                      <i-col span="10">
                        <i-form-item label="姓名">
                          <span>{{personModel.xm}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="10">
                        <i-form-item label="性别">
                          <span>{{personModel.xbCn}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="10">
                        <i-form-item label="民族">
                          <span>{{personModel.mzCn}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="18">
                        <i-form-item label="出生年月">
                          <span>{{personModel.csrq}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="18">
                        <i-form-item label="文化程度">
                          <span>{{personModel.whcdCn}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="10">
                        <i-form-item label="婚姻状况">
                          <span>{{personModel.hyzkCn}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="18">
                        <i-form-item label="身份证号">
                          <span>{{personModel.sfzh}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="18">
                        <i-form-item label="出生地">
                          <span>{{personModel.csdCn}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="18">
                        <i-form-item label="户籍地">
                          <span>{{personModel.hjdCn}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                    <i-row>
                      <i-col span="24">
                        <i-form-item label="户籍地详址">
                          <span>{{personModel.hjdxz}}</span>
                        </i-form-item>
                      </i-col>
                    </i-row>
                  </i-form>
                </div>
                <div style="height: 100%;width:150px;display:block;float: left">
                  <img style="width: 150px;height: 200px;" :src="'data:image/png;base64,'+personModel.zp">
                </div>
              </div>
              <div slot="footer" style="text-align: center">
                <Button type="primary" @click="personModal = false">关闭</Button>
              </div>
            </i-modal>
            <i-modal v-model="escapeModal" width="1000px">
              <p slot="header" style="color:#f60;">
                <span class="title">公安部人口库信息</span>
              </p>
              <div style="height: 400px" class="escapeModal">
                <i-table border v-show="isEscape" ref="escapeTable" :columns="escapeColumn" :data="escapeData">
                </i-table>
                <span style="text-align: center" v-show="!isEscape">没有比对中在逃人员信息！</span>
              </div>
              <div slot="footer" style="text-align: center">
                <Button type="primary" @click="escapeModal = false">关闭</Button>
              </div>
            </i-modal>
          </i-tab-pane>
          <i-tab-pane label="审核通过" name="audit" style="position:relative;">
            <div class="searchTitleInput">
              <span class="searchItemText">姓名:</span>
              <input class="searchItemInput" type="text" v-model="searchCon1.data.rybhName" placeholder="请输入姓名">
              <span class="searchItemText">档案编号:</span>
              <input class="searchItemInput" type="text" v-model="searchCon1.data.dabh" placeholder="请输入档案编号">
              <span class="searchItemText">监室号:</span>
              <input class="searchItemInput" type="text" v-model="searchCon1.data.jsh" placeholder="请输入监室号">
              <span class="searchItemText">律师姓名:</span>
              <input class="searchItemInput" type="text" v-model="searchCon1.data.lawyerName" placeholder="请输入律师姓名">
              <br />
              <span class="searchItemText">入所时间:</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setEntryDateStart1" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <span class="searchItemText" style="text-align: right">至</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setEntryDateEnd1" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <span class="searchItemText">预约时间:</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setGrantDateStart1" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <span class="searchItemText" style="text-align: right">至</span>
              <i-date-picker class="searchItemDate" type="date" @on-change="setGrantDateEnd1" format="yyyy-MM-dd" placeholder="请输入日期"></i-date-picker>
              <i-button ghost style="margin-left: 10px;" @click="searchByCon1" class="searchButton">查询</i-button>
            </div>
            <i-table border ref="table" :columns="columns1" :data="data1" style="height:calc(100% - 12vw);margin:0 10px;">

            </i-table>
            <div class="tablePage">
              <i-page style="text-align: right" :current="searchCon1.pageParam.pageIndex" :total="total1" :page-size="searchCon1.pageParam.pageSize" :page-size-opts="pageSizeOpts" show-total @on-change="changePageIndex1" @on-page-size-change="changePageSize1" show-elevator show-sizer>
              </i-page>
            </div>
          </i-tab-pane>
        </i-tabs>
      </i-content>
    </i-layout>
  </i-content>
</template>
<script>
import config from '@/config';
import io from 'socket.io-client';
import { getDate } from '@/libs/tools';
import NormalButton from '_c/normal-button';
import {
  searchByCon, getAuditDetailById, getCurUserInfo, listRoomByType, getByTypeCodeAndFieldValue, getPopulationBankInfo, getFugitiveInfo,
  submitAuditModel, uploadImage, updateRoomStatus, searchRybhName, searchBoxDataUrl, getRoomStatus, getLawyerInfo
} from '@/api/bg-manage/manage/manage';
import selectBox from '_c/select-box/select-box.vue';
const getHandledValue = num => {
  return num < 10 ? '0' + num : num;
};
export default {
  name: 'meetRegister',
  components: {
    NormalButton,
    selectBox
  },
  data () {
    return {
      escapeModal: false,
      lawyers: [],
      personModel: {
        xm: '',
        xbCn: '',
        mzCn: '',
        hyzkCn: '',
        whcdCn: '',
        zp: '',
        sfzh: '',
        hjdCn: '',
        hjdxz: '',
        csdCn: '',
        csrq: ''
      },
      personModal: false,
      rooms: [],
      roomModal: false,
      cameraModal: false,
      isAttorney: true,
      phaseName: '',
      dicUrl: searchBoxDataUrl,
      isApproval: true,
      isCancel: false,
      isLegaAidf: false,
      submitClear: false,
      url: searchRybhName,
      orderTime: new Date(),
      audit: true,
      small: 'small',
      imageFormat: ['jpg', 'jpeg', 'png'],
      imageAcceptFormat: '.jpg,.jpeg,.png',
      lsfjList: [], // 律师房间
      rybhNameList: [],
      auditModel: {
        businessId: '',
        introductoryNumber: '',
        telephone: '',
        assistantUnit: '',
        otherMembers: '',
        number: '',
        remarks: '',
        operationTime: '',
        manager: '',
        headImg: '',
        id: '',
        organType: '',
        rybhName: '',
        rybh: '',
        jsh: '',
        rssj: '',
        ligition: '',
        management: '',
        gyqx: '',
        dabh: '',
        hjdxz: '',
        zjhm: '',
        delegationLawyer: '',
        idCard: '',
        lawyerName: '',
        lawyerNumber: '',
        iphone: '',
        idCard2: '',
        lawyerName2: '',
        lawyerNumber2: '',
        iphone2: '',
        lawyerUnit: '',
        lawyerUnit2: '',
        clientName: '',
        attorneyType: '',
        legalAidf: '0',
        registerTime: '',
        lawyerRoom: '',
        meetingRoom: '',
        idCardUrl: '',
        headPortraitUrl: '',
        lawyerUrl: '',
        certificationUrl: '',
        attorneyUrl: '',
        approvalStatus: '',
        appointmentDate: '',
        appointmentTime: ''
      },
      auditModel1: {
        introductoryNumber: '',
        telephone: '',
        assistantUnit: '',
        otherMembers: '',
        number: '',
        remarks: '',
        operationTime: '',
        manager: '',
        headImg: '',
        id: '',
        organType: '',
        rybhName: '',
        rybh: '',
        jsh: '',
        rssj: '',
        ligition: '',
        management: '',
        gyqx: '',
        dabh: '',
        hjdxz: '',
        zjhm: '',
        delegationLawyer: '',
        idCard: '',
        lawyerName: '',
        lawyerNumber: '',
        iphone: '',
        idCard2: '',
        lawyerName2: '',
        lawyerNumber2: '',
        iphone2: '',
        lawyerUnit: '',
        lawyerUnit2: '',
        clientName: '',
        attorneyType: '',
        legalAidf: '0',
        registerTime: '',
        lawyerRoom: '',
        meetingRoom: '',
        idCardUrl: '',
        headPortraitUrl: '',
        lawyerUrl: '',
        certificationUrl: '',
        attorneyUrl: '',
        approvalStatus: '',
        appointmentDate: '',
        appointmentTime: ''
      },
      isAudit: true,
      auditModal: false,
      addModal: false,
      data: [],
      data1: [],
      pageSize: 10,
      pageSizeOpts: [10, 15, 20], // 每页显示条数的配置
      total: 0,
      total1: 0, // 总条数
      pageCurrent: 1, // 当前页
      searchCon: {
        needPage: true,
        pageParam: {
          pageIndex: 1,
          pageSize: 10
        },
        data: {
          approvalStatus: '0', // 待审核
          jsh: '',
          dabh: '',
          lawyerName: '',
          ryhbName: '',
          grantDateStart: '',
          grantDateEnd: '',
          entryDateStart: '',
          entryDateEnd: ''
        }
      },
      searchCon1: {
        needPage: true,
        pageParam: {
          pageIndex: 1,
          pageSize: 10
        },
        data: {
          approvalStatus: '1', // 已经审核
          jsh: '',
          dabh: '',
          lawyerName: '',
          ryhbName: '',
          grantDateStart: '',
          grantDateEnd: '',
          entryDateStart: '',
          entryDateEnd: ''
        }
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 90,
          align: 'center'
        },
        {
          title: '监室号',
          width: 100,
          key: 'jsh'
        },
        {
          title: '姓名',
          width: 100,
          key: 'prisonerName'
        },
        {
          title: '诉讼环节',
          key: 'ligition'
        },
        {
          title: '律师姓名',
          key: 'lawyerName'
        },
        {
          title: '律师证件号码',
          key: 'lawyerNumber'
        },
        {
          title: '律师执业机构',
          key: 'lawyerUnit'
        },
        {
          title: '预约会见时间',
          render: (h, params) => {
            if (params.row.appointmentDate) {
              let date = this.getFormatDate(params.row.appointmentDate).split(' ')[0];
              return h('span', date);
            }
          }
        },
        {
          title: '预约会见时间段',
          render: (h, params) => {
            if (params.row.appointmentTime) {
              return h('span', params.row.appointmentTime);
            }
          }
        },
        {
          title: '会见预约类型',
          key: 'meetType'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '会见资料审核',
                  perms: 'manage:pass'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.getAuditDetail(params.row.id);
                    this.auditModal = true;
                  }
                }
              })
            ]);
          }
        }],
      columns1: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '监室号',
          width: 100,
          key: 'jsh'
        },
        {
          title: '姓名',
          width: 100,
          key: 'prisonerName'
        },
        {
          title: '诉讼环节',
          key: 'ligition'
        },
        {
          title: '律师姓名',
          key: 'lawyerName'
        },
        {
          title: '律师证件号码',
          key: 'lawyerNumber'
        },
        {
          title: '律师执业机构',
          key: 'lawyerUnit'
        },
        {
          title: '预约会见时间',
          render: (h, params) => {
            if (params.row.appointmentDate) {
              let date = this.getFormatDate(params.row.appointmentDate).split(' ')[0];
              return h('span', date);
            }
          }
        },
        {
          title: '预约会见时间段',
          render: (h, params) => {
            if (params.row.appointmentTime) {
              return h('span', params.row.appointmentTime);
            }
          }
        },
        {
          title: '会见预约类型',
          key: 'meetType'
        },
        {
          title: '会见室',
          key: 'meetingRoom'
        },
        {
          title: '会见状态',
          render: (h, params) => {
            if (params.row.meetStatus) {
              if (params.row.meetStatus === '0') {
                return h('span', '未开始');
              } else if (params.row.meetStatus === '1') {
                return h('span', '正在会见');
              } else if (params.row.meetStatus === '2') {
                return h('span', '会见结束');
              }
            }
          }
        },
        {
          title: '验证码',
          key: 'code'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h(NormalButton, {
                props: {
                  type: 'primary',
                  size: 'small',
                  label: '资料详情'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.getAuditDetail1(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      escapeData: [],
      escapeColumn: [
        {
          title: '姓名',
          width: 100,
          key: 'XM'
        },
        {
          title: '性别',
          width: 100,
          key: 'XMDM'
        },
        {
          title: '出生日期',
          width: 120,
          key: 'CSRQ'
        },
        {
          title: '身份证号',
          width: 150,
          key: 'SFZH'
        },
        {
          title: '简要案情',
          width: 250,
          render: (h, params) => {
            if (params.row.JYAQ) {
              if (params.row.JYAQ.length > 30) {
                return h('span', params.row.JYAQ.substring(0, 30));
              }
              return h('span', params.row.JYAQ);
            }
          }
        },
        {
          title: '立案单位',
          width: 150,
          key: 'LADW_GAJGMC'
        }
      ],
      isAdd: false,
      addRule: {
        rybhName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        idCard: [{ required: true, message: '不能为空' }],
        lawyerName: [{ required: true, message: '不能为空' }],
        lawyerNumber: [{ required: true, message: '不能为空' }],
        lawyerUnit: [{ required: true, message: '不能为空' }]
      },
      cameraUrl: '',
      isEscape: false,
      tableHeight: 0,
      socket: {}
    };
  },
  computed: {
  },
  methods: {
    closeModal () { },
    closeAddModal (visit) {
      if (!visit) {
        this.$refs.auditModel1.resetFields();
      }
    },
    searchByPage () {
      searchByCon(this.searchCon).then(res => {
        this.data = res.data.data;
        this.total = res.data.page.total;
      });
    },
    searchByCon () {
      this.searchCon.pageParam.pageIndex = 1;
      searchByCon(this.searchCon).then(res => {
        this.data = res.data.data;
        this.total = res.data.page.total;
      });
    },
    searchByPage1 () {
      searchByCon(this.searchCon1).then(res => {
        this.data1 = res.data.data;
        this.total1 = res.data.page.total;
      });
    },
    searchByCon1 () {
      this.searchCon1.pageParam.pageIndex = 1;
      searchByCon(this.searchCon1).then(res => {
        this.data1 = res.data.data;
        this.total1 = res.data.page.total;
      });
    },
    setGrantDateStart (date) {
      this.searchCon.data.grantDateStart = date;
    },
    setGrantDateEnd (date) {
      this.searchCon.data.grantDateEnd = date;
    },
    setEntryDateStart (date) {
      this.searchCon.data.entryDateStart = date;
    },
    setEntryDateEnd (date) {
      this.searchCon.data.entryDateEnd = date;
    },
    setEntryDateStart1 (date) {
      this.searchCon1.data.entryDateStart = date;
    },
    setEntryDateEnd1 (date) {
      this.searchCon1.data.entryDateEnd = date;
    },
    setGrantDateStart1 (date) {
      this.searchCon1.data.grantDateStart = date;
    },
    setGrantDateEnd1 (date) {
      this.searchCon1.data.grantDateEnd = date;
    },
    getFormatDate (timeStamp) {
      const d = new Date(timeStamp);
      const year = d.getFullYear();
      const month = getHandledValue(d.getMonth() + 1);
      const date = getHandledValue(d.getDate());
      return year + '-' + month + '-' + date;
    },
    getAuditDetail (id) {
      this.isLegaAidf = false;
      this.isApproval = true;
      this.isCancel = false;
      this.submitClear = !this.submitClear;
      this.audit = true;
      this.isAdd = false;
      let model = {};
      this.auditModel = {};
      getAuditDetailById(id).then(res => {
        model = res.data.data;
        getCurUserInfo().then(res => {
          model.operatorPolice = res.data.data.userName;
          this.auditModel = Object.assign({}, model);
          this.auditModel.legalAidf = '0';
          this.auditModel.approvalStatus = '1';
          this.auditModel.operationTime = getDate(new Date().getTime(), 'year');
          listRoomByType('2').then(res => {
            this.lsfjList = res.data.data;
            // this.auditModel.meetingRoom = this.lsfjList[0].value;
          });
          if (this.auditModel.delegationStage) {
            getByTypeCodeAndFieldValue('SYS_DIC_CERTIFICATE', this.selectPersonnel.idType).then(res => {
              this.phaseName = res.data.data.fieldName;
            });
          }
        });
      });
    },
    getAuditDetail1 (row) {
      this.audit = false;
      this.isAdd = false;
      let model = {};
      if (row.appointmentDate) {
        this.auditModal = true;
        this.auditModel = {};
      } else {
        this.addModal = true;
        this.auditModel1 = {};
      }
      getAuditDetailById(row.id).then(res => {
        model = res.data.data;
        if (row.appointmentDate) {
          this.auditModel = Object.assign({}, model);
        } else {
          this.auditModel1 = Object.assign({}, model);
        }
        if (model.attorneyType) {
          switch (model.attorneyType) {
            case '1':
              this.isAttorney = true;
              break;
            case '2':
              this.isAttorney = false;
              break;
          }
        }
        if (model.approvalStatus) {
          switch (model.approvalStatus) {
            case '1':
              this.isApproval = true;
              this.isCancel = false;
              break;
            case '2':
              this.isApproval = false;
              this.isCancel = false;
              break;
            case '3':
              this.isApproval = false;
              this.isCancel = true;
              break;
          }
        }
        if (model.legalAidf) {
          switch (model.legalAidf) {
            case '0':
              this.isLegaAidf = false;
              break;
            case '1':
              this.isLegaAidf = true;
              break;
          }
        }
        if (model.delegationStage) {
          getByTypeCodeAndFieldValue('SYS_DIC_COMMISSIONING_PHASE', model.delegationStage).then(res => {
            this.phaseName = res.data.data.fieldName;
          });
        }
      });
      listRoomByType('2').then(res => {
        this.lsfjList = res.data.data;
      });
    },
    commitAuditModel () {
      this.$refs['auditModel'].validate((valid) => {
        if (valid) {
          /*         validateLawyerRule(this.auditModel).then(res => {
            if (res.data.state.code === 200) { */
          submitAuditModel(this.auditModel).then(res => {
            if (res.data.state.code === 200) {
              this.$Message.success('审批成功');
              this.socket.emit('sendNewMessage', JSON.stringify({
                data: {
                  prisonerName: this.auditModel.rybhName,
                  lawyerName: this.auditModel.lawyerName,
                  lawyerUnit: this.auditModel.lawyerUnit,
                  prisonerRoom: this.auditModel.jsh,
                  roomId: this.auditModel.meetingRoom
                }
              }), this.auditModel.meetingRoom);
              this.addModal = false;
              this.auditModal = false;
              this.searchByCon();
            }
          });
        } else {
          this.$Message.error(res.data.data);
        }
      });
    },
    commitAuditModel1 () {
      this.$refs['auditModel1'].validate((valid) => {
        if (valid) {
          submitAuditModel(this.auditModel1).then(res => {
            if (res.data.state.code === 200) {
              this.$Message.success('审批成功');
              this.auditModal = false;
              this.addModal = false;
              this.searchByCon();
            }
          });
        } else {
          this.$Message.error(res.data.data);
        }
      });
      /*  } */
      /*      }); */
    },
    uploadImage (file, item) { // 上传文件
      const formData = new window.FormData();
      formData.append('files', file);
      uploadImage(formData).then(res => {
        if (res.data.state.code === 200) {
          this.$Message.success('上传成功');
          if (this.addModal) {
            this.$set(this.auditModel1, item, res.data.data[0].encUrl);
          } else {
            this.$set(this.auditModel, item, res.data.data[0].encUrl);
          }
        }
      });
    },
    changePageIndex (index) {
      this.searchCon.pageParam.pageIndex = index;
      this.searchByPage();
    },
    changePageSize (pageSize) {
      this.searchCon.pageParam.pageSize = pageSize;
      this.searchByPage();
    },
    changePageIndex1 (index) {
      this.searchCon1.pageParam.pageIndex = index;
      this.searchByPage1();
    },
    changePageSize1 (pageSize) {
      this.searchCon1.pageParam.pageSize = pageSize;
      this.searchByPage1();
    },
    changeTabs (name) {
      switch (name) {
        case 'manage':
          this.searchByCon();
          break;
        case 'audit':
          this.searchByCon1();
          break;
      }
    },
    download (itemUrl) {
      if (!itemUrl) {
        return;
      }
      window.open(itemUrl);
    },
    updateRoomStatus (id, status) {
      let params = {};
      params.id = id;
      params.roomStatus = status;
      updateRoomStatus(params).then(res => {
        if (res.data.state.code === 200) {
          this.$Message.success('修改成功！');
          this.searchByCon2();
        }
      });
    },
    addMeetInfo () {
      this.isLegaAidf = false;
      this.isAttorney = true;
      this.submitClear = !this.submitClear;
      this.addModal = true;
      this.isAdd = true;
      this.audit = true;
      this.auditModel1.headImg = '';
      this.auditModel1.headPortraitUrl = '';
      this.auditModel1.lawyerUrl = '';
      this.auditModel1.idCardUrl = '';
      this.auditModel1.certificationUrl = '';
      this.auditModel1.attorneyUrl = '';
      this.phaseName = '';
      this.auditModel1.approvalStatus = '1';
      this.auditModel1.legalAidf = '0';
      this.auditModel1.attorneyType = '1';
      getCurUserInfo().then(res => {
        this.auditModel1.operatorPolice = res.data.data.userName;
        this.auditModel1.operationTime = getDate(new Date().getTime(), 'year');
        listRoomByType('2').then(res => {
          this.lsfjList = res.data.data;
          this.auditModel1.meetingRoom = this.lsfjList[0].value;
        });
      });
    },
    getNameVal (item) {
      if (!item) {
        return;
      }
      if (item.rssj) {
        this.auditModel1.rssj = this.getFormatDate(item.rssj);
      }
      if (item.gyqx) {
        this.auditModel1.gyqx = this.getFormatDate(item.gyqx);
      }
      this.auditModel1.dabh = item.code;
      this.auditModel1.rybhName = item.label;
      this.auditModel1.rybh = item.value;
      this.auditModel1.hjdxz = item.hjdxz;
      this.auditModel1.organType = item.organType;
      this.auditModel1.ligition = item.ligition;
      this.auditModel1.headImg = item.headImg;
      this.auditModel1.jsh = item.jsh;
    },
    getPhaseVal (item) {
      if (item.code === undefined) {
        this.auditModel1.delegationStage = '';
        return;
      }
      this.auditModel1.delegationStage = item.code;
    },
    changeLegaAidf (label) {
      label === '1' ? this.isLegaAidf = true : this.isLegaAidf = false;
    },
    changeApprovalStatus (label) {
      if (label === '1') {
        this.isApproval = true;
        this.isCancel = false;
        this.auditModel.approvalStatus = '1';
        this.auditModel1.approvalStatus = '1';
      } else if (label === '2') {
        this.isApproval = false;
        this.isCancel = false;
        this.auditModel.approvalStatus = '2';
        this.auditModel1.approvalStatus = '2';
      } else if (label === '3') {
        this.isApproval = false;
        this.isCancel = true;
        this.auditModel.approvalStatus = '3';
        this.auditModel1.approvalStatus = '3';
      }
    },
    changeAttorneyType (label) {
      label === '1' ? this.isAttorney = true : this.isAttorney = false;
    },
    camera () {
      let Index = document.getElementById('resoultion').selectedIndex;
      let jsonObj = { FuncName: 'CaptureEncodeBase64', argument: { nIndex: Index } };
      sendWsMessage(jsonObj);
    },
    upload (url) {
      let img = document.getElementById('img');
      if (!img || img.getAttribute('src').length < 100) {
        this.$Message.success('请先拍照！');
        return false;
      }
      let src = img.getAttribute('src');
      let file = dataURLtoFile(src);
      this.uploadImage(file, url);
      this.cameraModal = false;
      document.getElementById('img').setAttribute('src', '');
    },
    // 打开高拍仪
    openCamera (url) {
      isOpenCarmera = false;
      this.cameraModal = true;
      this.cameraUrl = url;
      var jsonObj = { FuncName: 'camOpenDev', argument: { devIndex: 0, subtype: 0, width: 0, height: 0 } };
      sendWsMessage(jsonObj);
    },
    // 打开摄像头
    openCamera1 (url) {
      isOpenCarmera = true;
      this.cameraModal = true;
      this.cameraUrl = url;
      var jsonObj = { FuncName: 'camOpenDev', argument: { devIndex: 1, subtype: 0, width: 0, height: 0 } };
      sendWsMessage(jsonObj);
    },
    roomDetail () {
      this.roomModal = true;
      getRoomStatus().then(res => {
        this.rooms = res.data.data;
      });
    },
    /* 人口库比对 */
    personCheck (idCard) {
      if (!idCard) {
        this.$Message.error('请输入身份证号');
        return;
      }
      this.personModel = {};
      this.personModal = true;
      getPopulationBankInfo(idCard).then(res => {
        if (res.data.data.length > 0) {
          this.personModel = res.data.data[0];
        }
      });
    },
    escapeCheck (idCard) {
      if (!idCard) {
        this.$Message.error('请输入身份证号');
        return;
      }
      this.escapeModal = true;
      this.escapeData = [];
      this.isEscape = false;
      getFugitiveInfo(idCard).then(res => {
        if (res.data.data.length > 0) {
          this.escapeData = res.data.data;
          this.isEscape = true;
        } else {
          this.isEscape = false;
        }
      });
    },
    // 获取委托律师信息
    getLawyerInfo () {
      let rybh = this.auditModel.rybh;
      this.lawyers = [];
      getLawyerInfo(rybh, 'ck.lshj.lsxx.his.fysj').then(res => {
        let data = res.data.data;
        if (data) {
          data.forEach(item => {
            if (item.WTZT === '委托中') {
              this.lawyers.push({
                LSXM: item.LSXM,
                ID: item.ID
              });
            }
          });
        }
      });
    },
    lawyerDetail (id) {
      // 根据委托律师获取详情，直接填充
      // alert(index);
      this.lawyers.forEach(item => {
        if (item.ID === id) {
          // 填充律师2信息
          this.auditModel.idCard2 = item.SFZJ;
          this.auditModel.lawyerName2 = item.LSXM;
          this.auditModel.lawyerNumber2 = item.ZYZH;
          this.auditModel.iphone2 = item.DHHM;
          this.auditModel.lawyerUnit2 = item.LSDW;
        }
      });
    },
    closeCamera (visit) {
      if (!visit) {
        let img = document.getElementById('img');
        if (document.getElementById('img')) {
          img.remove();
          this.$refs.img.src = '';
        }
      }
    }
  },
  watch: {
  },
  mounted () {
    this.searchByCon(this.searchCon);
    this.socket = io(config.meetSystemURL);
    const _this = this;
    this.socket.on('disconnect', () => {
      _this.socket.open();
    });
    StartWebSocket();
  }
};
</script>
<style lang="less" scoped>
.ivu-message {
  z-index: 999999999 !important;
}
/deep/#sfz {
  width: 760px !important;
  input {
    width: 610px !important;
  }
}
/deep/#hjdxz {
  input {
    width: 555px !important;
  }
}
.upload-content {
  .ivu-upload-drag {
    background: transparent;
  }
}
.uploadBtn {
  width: 60px !important;
  height: 30px !important;
  margin: 10px 0 0 20px !important;
}
.menuInfoBox {
  width: 14.5%;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(52, 108, 234, 0.27);
  margin: 0 1% 4px 1%;
  float: left;
  .infoBox {
    width: 95%;
    height: 118px;
    background: rgba(227, 234, 254, 1);
    border-radius: 4px;
    margin: 6px 9px;
    overflow: auto;
    font: 14px Microsoft YaHei;
    color: rgba(85, 85, 85, 1);
    .areaName {
      display: block;
      height: 16px;
      width: 100px;
      margin: 5px auto;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .menuInfo {
      display: block;
      width: 100px;
      margin: 0 auto;
      line-height: 35px;
      text-align: center;
    }
    .roomInfoBox {
      width: 50%;
      float: left;
    }
  }
}
.selectColor {
  background-color: #007aff !important;
  border-color: #007aff !important;
  span {
    color: white;
  }
}
.cameraBox {
  width: 100px;
  height: 100px;
  line-height: 89px;
  border: 1px dashed #ffffff;
  margin: 5px auto 4px auto;
}
.cameraBox2 {
  width: 100px;
  height: 100px;
  line-height: 89px;
  margin: 5px auto;
}
.roomDetail {
  width: 120px;
  height: 60px;
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
.roomUsedColor {
  background: 1px green;
}
.roomNoUsedColor {
  background: 1px orangered;
}
.personModel {
  .ivu-form-item {
    margin-bottom: 5px !important;
  }
}
/deep/#img {
  margin: 0 !important;
}
</style>
