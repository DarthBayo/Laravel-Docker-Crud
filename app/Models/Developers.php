<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developers extends Model
{
    use HasFactory;
    protected $fillable = [
        'nome',
        'sexo',
        'idade',
        'hobby',
        'datanascimento'
    ];
    protected $guarded = [
        'id'
    ];
    protected $casts = [
        'datanascimento' => 'date:d-m-Y',
    ];
    public $timestamps = false;
}
